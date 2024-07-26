import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus
from frappe.utils import now,add_to_date,pretty_date,money_in_words    
from datetime import datetime 

class LibraryMembership(Document):
    def validate(self):
        # pass
        # result = frappe.db.sql(
        # f"""
        # SELECT `description`,
        #         COUNT(*) as count,
        #         COUNT(CASE WHEN CAST(`isbn` as Integer) = 1 THEN 1 END) as unique_count
        # FROM `tabArticle`""",as_dict=1)
        # for j in result:
        #     print("JJJJJJJJJJJJJJJJJJJJJJJJJJ:",j.unique_count)
        # # print("----------------------------!!!!!!!!!!!!!>>>>>>>>>>",result)
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",money_in_words(900.50,'USD'))
        # today = datetime.now().strftime('%Y-%m-%d')
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",today) 
        # after_10_days = add_to_date(datetime.now(), days=10, as_string=True)
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",after_10_days) 

        # print("!!!!!!!!!!!!!!!!!!!!!!!",add_to_date(datetime.now(), months=2))
        # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!",add_to_date(datetime.now(), days=10, as_string=True, as_datetime=True)) 
        # print("!!!!!!!!!!!!!!!!!!!!!!!!",add_to_date(None, years=6))
        # doc=frappe.db.exists("Employee", {"first_name": "Monil"})
        # doc=frappe.db.count('Article')
        # doc = frappe.get_list('Employee',filters={'first_name':'Monil'},fields=['last_name'])
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)
        # doc= frappe.db.get_value('Employee', 'HR-EMP-00002', ['employee_name', 'designation'], as_dict=1)
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)
        # task_dict.subject
        # task_dict.description
        # doc=frappe.db.get_value('Employee', 'HR-EMP-00002', ['employee_name', 'designation'])
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)
#         doc=frappe.db.get_list('Employee', filters={
#     'first_name': ['like', '%va%']
# })
#         print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)

#         doc= frappe.db.get_list('Employee', filters={
#     'date_of_joining': ['>', '2024-5-20']
# })
#         print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)

        # doc =frappe.db.get_list('Employee',pluck='designation')
        # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",doc)
        doc = frappe.get_doc('Employee', 'HR-EMP-00001')
        print("!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>",doc.employee_name)
    #     frappe.db.set_value('Employee', 'HR-EMP-00001', {
    # 'first_name': 'Monil',
    # 'last_name': 'kamboj'
    #  })
        # doc2 = frappe.get_doc('Employee', 'HR-EMP-00001')
        # doc2.db_set('first_name','Monil')
        # doc2.employee_name = f'{doc2.first_name} {doc2.last_name or ""}'
        # print("!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>",doc2.employee_name)
        # _doc = frappe.get_doc('Employee', 'HR-EMP-00001')
        # print("!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>",_doc.employee_name)
        # _doc = frappe.get_doc('Employee', 'HR-EMP-00001')
        # print("!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>",_doc.employee_name)
    # check before submitting this document
    def before_submit(self):
        exists = frappe.db.exists(
            "Library Membership",
            {
                "library_member": self.library_member,
                "docstatus": DocStatus.submitted(),
                # check if the membership's end date is later than this membership's start date
                "to_date": (">", self.from_date),
            },
        )
        if exists:
            frappe.throw("There is an active membership for this member")

        # get loan period and compute to_date by adding loan_period to from_date
        loan_period = frappe.db.get_single_value("Library Settings", "loan_period")
        self.to_date = frappe.utils.add_days(self.from_date, loan_period or 30)
