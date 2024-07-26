# Copyright (c) 2024, monil kamboj and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class LibraryMember(Document):

    def validate(self):
        # if self.full_name != self.name:
        #     self.after_save()
        self.set_member_name()

    def set_member_name(self):
        self.full_name = " ".join(
            filter(lambda x: x, [self.first_name, self.last_name])
         )
    # def before_save(self):
    #     self.full_name = f'{self.first_name} {self.last_name or ""}'
    # def after_save(self):
    #     self.rename(self.full_name)

    # def validate(self):
    #     # doc = frappe.get_doc('Library Member','first_name')
    #     print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",self.first_name)
