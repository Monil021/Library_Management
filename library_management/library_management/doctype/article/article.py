# Copyright (c) 2024, monil kamboj and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator


class Article(WebsiteGenerator):
	def validate(self):
		self.temp()
	def temp(self):
		self.rename(self.article_name)
		
