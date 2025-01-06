from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in callhippo/__init__.py
from callhippo import __version__ as version

setup(
	name="callhippo",
	version=version,
	description="Integration with Call Hippo",
	author="Abhishek Chougule",
	author_email="abhishek.c@onehash.ai",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
