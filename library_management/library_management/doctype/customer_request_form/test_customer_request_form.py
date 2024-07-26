import frappe
from frappe.tests.utils import FrappeTestCase
from jinja2 import TemplateSyntaxError
from frappe import _, throw
from frappe.contacts.address_and_contact import set_link_title
from frappe.core.doctype.dynamic_link.dynamic_link import deduplicate_dynamic_links
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils import cstr

class TestCustomerRequestForm(FrappeTestCase):
	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.core.doctype.dynamic_link.dynamic_link import DynamicLink
		from frappe.types import DF

		address_line1: DF.Data
		address_line2: DF.Data | None
		address_title: DF.Data | None
		address_type: DF.Literal[
			"Billing",
			"Shipping",
			"Office",
			"Personal",
			"Plant",
			"Postal",
			"Shop",
			"Subsidiary",
			"Warehouse",
			"Current",
			"Permanent",
			"Other",
		]
		city: DF.Data
		country: DF.Link
		county: DF.Data | None
		disabled: DF.Check
		email_id: DF.Data | None
		fax: DF.Data | None
		is_primary_address: DF.Check
		is_shipping_address: DF.Check
		links: DF.Table[DynamicLink]
		phone: DF.Data | None
		pincode: DF.Data | None
		state: DF.Data | None
