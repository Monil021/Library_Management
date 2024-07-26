// Copyright (c) 2024, monil kamboj and contributors
// For license information, please see license.txt

frappe.ui.form.on("Library Transaction", {
	type(frm) {
        if(frm.doc.type=='Issue' && frm.doc.date!=null){
        frm.save('Submit');}
	},
});
