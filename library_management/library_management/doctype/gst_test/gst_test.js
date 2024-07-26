frappe.ui.form.on('GST Test', {
    gst_number: function(frm) {
        if (frm.doc.gst_number && frm.doc.state) {
            var gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][0-9A-Z][A-Z0-9]$/;
            
            if (gstRegex.test(frm.doc.gst_number)) {
                var gstStateCode = frm.doc.gst_number.substring(0, 2); // Extract state code from GST number
                var selectedStateCode = frm.doc.state.substring(0, 2); // Extract state code from selected state
                
                // Define a mapping of states to their respective GST numbers
                var stateToGSTMapping = {
                    'Andhra Pradesh': '37',
                    'Arunachal Pradesh': '12',
                    'Assam': '18',
                    'Bihar': '10',
                    'Chhattisgarh': '22',
                    'Goa': '30',
                    'Gujarat': '24',
                    'Haryana': '06',
                    'Himachal Pradesh': '02',
                    'Jharkhand': '20',
                    'Karnataka': '29',
                    'Kerala': '32',
                    'Madhya Pradesh': '23',
                    'Maharashtra': '27',
                    'Manipur': '14',
                    'Meghalaya': '17',
                    'Mizoram': '15',
                    'Nagaland': '13',
                    'Odisha': '21',
                    'Punjab': '03',
                    'Rajasthan': '08',
                    'Sikkim': '11',
                    'Tamil Nadu': '33',
                    'Telangana': '36',
                    'Tripura': '16',
                    'Uttar Pradesh': '09',
                    'Uttarakhand': '05',
                    'West Bengal': '19',
                    'Andaman and Nicobar Islands': '35',
                    'Chandigarh': '04',
                    'Dadra and Nagar Haveli and Daman and Diu': '26',
                    'Delhi': '07',
                    'Lakshadweep': '31',
                    'Puducherry': '34'
                };
                
                // Check if the entered GST number matches the GST number for the selected state
                if (stateToGSTMapping[frm.doc.state] !== gstStateCode) {
                    frappe.msgprint('GST number does not match with selected state. Please correct it.');
                } else {
                    frappe.msgprint('Valid GST number!');
                }
            }
            else {
                setTimeout(function() {
                    frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
                }, 1000);
            }
        }
    },

    state: function(frm) {
        // Trigger validation on state change if GST number is already entered
        if (frm.doc.gst_number) {
            frm.trigger('gst_number');
        }
    }
});
