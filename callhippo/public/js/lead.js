frappe.ui.form.on('Lead', {
    refresh: async function (frm) {
        let call_hippo_enabled_name = await frappe.db.get_single_value('CallHippo Settings', 'enabled_name');
        if(call_hippo_enabled_name)
        {
            frm.add_custom_button(__('Call Logs CallHippo'), function () {
                frappe.set_route('List', 'CallHippo Call Logs', { 'to': ['in', fetchContactNumbers(frm)] });
            }, __('Connect'));

            frm.add_custom_button("Call with CallHippo", async function () {
                clickToCall(frm, "Call","CallHippo", 'tel:');
            }, __('Connect'));
        }
    }
});

async function clickToCall(frm,action,method,href){

    let phoneNumbers = await fetchContactNumbers(frm);

    // List all the numbers for click to call
    let setfields = '<span>'+action+'with '+method+':</span><br>';
    let count = 0;
    if (phoneNumbers == null) {
        frappe.msgprint("Please add Mobile Number First.");
        return false;
    }

    if(method=="CallHippo"){

        phoneNumbers.forEach(phoneNumber => {
            count++;
            setfields = setfields + '<div">' +
                '<a href="' + href + phoneNumber.substring() +'">' + count + ". ClickTo"+action+": " + phoneNumber + '</a>' +
                '</div><br>';
        });
        var d = new frappe.ui.Dialog({
            'fields': [
                { 'fieldname': method, 'fieldtype': 'HTML' },
            ],
        });
        if(method=="CallHippo"){
            d.fields_dict.CallHippo.$wrapper.html(setfields)
        }
        d.show();
    }
}
function fetchContactNumbers(event){

    //Fetch All numbers
    let addButton = document.querySelectorAll('.address-box');
    let addButtonHTML = Array.from(addButton).map(button => button.outerHTML);

    let html = addButtonHTML.join('');

    const phoneRegex = /\+?\d{10,}/g;
    const phoneNumbers = html.match(phoneRegex);
    return phoneNumbers;
}