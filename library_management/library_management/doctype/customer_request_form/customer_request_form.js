frappe.ui.form.on('Customer Request Form', {   
    onload: function(frm) {
        frm.toggle_display('gst_details_section', true);
        frm.toggle_display('msme_no', false);
        frm.toggle_display('type_microsmallmedium', false); 

        // var stateToGSTMapping = {
        //     'Andhra Pradesh': '37',
        //     'Arunachal Pradesh': '12',
        //     'Assam': '18',
        //     'Bihar': '10',
        //     'Chhattisgarh': '22',
        //     'Goa': '30',
        //     'Gujarat': '24',
        //     'Haryana': '06',
        //     'Himachal Pradesh': '02',
        //     'Jharkhand': '20',
        //     'Karnataka': '29',
        //     'Kerala': '32',
        //     'Madhya Pradesh': '23',
        //     'Maharashtra': '27',
        //     'Manipur': '14',
        //     'Meghalaya': '17',
        //     'Mizoram': '15',
        //     'Nagaland': '13',
        //     'Odisha': '21',
        //     'Punjab': '03',
        //     'Rajasthan': '08',
        //     'Sikkim': '11',
        //     'Tamil Nadu': '33',
        //     'Telangana': '36',
        //     'Tripura': '16',
        //     'Uttar Pradesh': '09',
        //     'Uttarakhand': '05',
        //     'West Bengal': '19',
        //     'Andaman and Nicobar Islands': '35',
        //     'Chandigarh': '04',
        //     'Dadra and Nagar Haveli':'26',
        //     'Delhi': '07',
        //     'Lakshadweep': '31',
        //     'Puducherry': '34'
        // };


        // if (frm.doc.gst_no) {
        //     frm.toggle_display('gst_details_section', true);
        // }

    },
    // before_save: function(frm) {
    //     // Initialize a variable to track validation status
    //     let validationFailed = false;
    
    //      // Iterate through each child row
    //      frm.doc.address_details.forEach(function(child) {
    //         // Validate Pin Code
    //         if (child.pin_code) {
    //             var pinRegex = /^[1-9][0-9]{5}$/;
    //             if (!pinRegex.test(child.pin_code)) {
    //                 frappe.msgprint(__("Pin Code format is incorrect in one of the address details. Please enter a valid Pin Code."));
    //                 validationFailed = true;
    //             }
    //         }

    //         // Validate Mobile Number / Landline Number
    //         if (child.mobile_no_landline_no) {
    //             var mobileRegex = /^\d{10}$/;
    //             if (!mobileRegex.test(child.mobile_no_landline_no)) {
    //                 frappe.msgprint(__("Mobile Number / Landline Number is invalid in one of the address details. Please enter a valid 10-digit mobile number."));
    //                 validationFailed = true;
    //             }
    //         }

    //         // Validate Alternate Mobile Number
    //         if (child.alternate_mobile_no) {
    //             var mobileRegex1 = /^\d{10}$/;
    //             if (!mobileRegex1.test(child.alternate_mobile_no)) {
    //                 frappe.msgprint(__("Alternate Mobile Number is invalid in one of the address details. Please enter a valid 10-digit mobile number."));
    //                 validationFailed = true;
    //             }
    //         }

    //         // Validate Email
    //         if (child.mail) {
    //             var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //             if (!emailRegex.test(child.mail)) {
    //                 frappe.msgprint(__("Please enter a valid email address in one of the address details."));
    //                 validationFailed = true;
    //             }
    //         }
    //     });

    before_save: function(frm) {
        

        let validationFailed = false;

        // Validate PAN number
        if (frm.doc.pan) {
            var panRegex = /^([A-Z]{5}[0-9]{4}[A-Z])$/;
            if (!panRegex.test(frm.doc.pan)) {
                frappe.msgprint(__("PAN number format is incorrect. Please enter a valid PAN number."));
                validationFailed = true;
            }
        }
    
        // Validate Pin Code
        if (frm.doc.pin_code) {
            var pinRegex = /^[1-9][0-9]{5}$/;
            if (!pinRegex.test(frm.doc.pin_code)) {
                frappe.msgprint(__("Pin Code format is incorrect. Please enter a valid Pin Code."));
                validationFailed = true;
            }
        }
    
        // Validate Mobile Number / Landline Number
        if (frm.doc.mobile_no_landline_no) {
            var mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(frm.doc.mobile_no_landline_no)) {
                frappe.msgprint(__("Mobile Number / Landline Number is invalid. Please enter a valid 10-digit mobile number."));
                validationFailed = true;
            }
        }
    
        // Validate Alternate Mobile Number
        if (frm.doc.alternate_mobile_no) {
            var mobileRegex1 = /^\d{10}$/;
            if (!mobileRegex1.test(frm.doc.alternate_mobile_no)) {
                frappe.msgprint(__("Alternate Mobile Number is invalid. Please enter a valid 10-digit mobile number."));
                validationFailed = true;
            }
        }
    
        // Validate Email
        if (frm.doc.mail) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(frm.doc.mail)) {
                frappe.msgprint(__("Please enter a valid email address."));
                validationFailed = true;
            }
        }   


        // Prevent saving if any validation failed
        if (validationFailed) {
            // Stop the save process
            frappe.validated = false;
        }
    },                           
    gst_no: function(frm) {
        // if(!frm.doc.gst_no || !frm.doc.statefrm){
        //     frm.toggle_display('gst_details_section', false);
        // }  
                                             
        if (frm.doc.gst_no && frm.doc.statefrm) {
            var gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][0-9A-Z][A-Z0-9]$/;
            
            if (gstRegex.test(frm.doc.gst_no)) {
                var gstStateCode = frm.doc.gst_no.substring(0, 2); // Extract state code from GST number
                // var x = frm.doc.gst_no.substring(2,12);
                // frm.set_value('pan',x);


                // var selectedStateCode = frm.doc.statefrm; // Extract state code from selected state
                // frappe.msgprint('Entered here!!!!!!!');
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
                    'Dadra and Nagar Haveli':'26',
                    'Delhi': '07',
                    'Lakshadweep': '31',
                    'Puducherry': '34'
                };

                // Check if the entered GST number matches the GST number for the selected state
                if (stateToGSTMapping[frm.doc.statefrm] !== gstStateCode) {
                    frappe.throw('GST number does not match with selected state. Please correct it.')
                } else {
                    frappe.show_alert('GST Number is Valid and Matches with State Code!');
                    // frm.toggle_display('gst_details_section', true);
                    // frm.set_value('gst_number', frm.doc.gst_no);
                                    }
            }
            else {
                setTimeout(function() {
                    frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
                }, 2000);
            }
        }
    },
    gst_no1: function(frm) {
        // if(!frm.doc.gst_no || !frm.doc.statefrm){
        //     frm.toggle_display('gst_details_section', false);
        // }  
                                             
        if (frm.doc.gst_no1 && frm.doc.state1) {
            var gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][0-9A-Z][A-Z0-9]$/;
            
            if (gstRegex.test(frm.doc.gst_no1)) {
                var gstStateCode = frm.doc.gst_no1.substring(0, 2); // Extract state code from GST number
                // var x = frm.doc.gst_no.substring(2,12);
                // frm.set_value('pan',x);


                // var selectedStateCode = frm.doc.statefrm; // Extract state code from selected state
                //frappe.msgprint('Entered here!!!!!!!');
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
                    'Dadra and Nagar Haveli':'26',
                    'Delhi': '07',
                    'Lakshadweep': '31',
                    'Puducherry': '34'
};


                // Check if the entered GST number matches the GST number for the selected state
                if (stateToGSTMapping[frm.doc.state1] !== gstStateCode) {
                    frappe.throw('GST number does not match with selected state. Please correct it.')
                } else {
                    frappe.show_alert('GST Number is Valid and Matches with State Code!');
                    // frm.toggle_display('gst_details_section', true);
                    // frm.set_value('gst_number', frm.doc.gst_no);
                                    }
            }
            else {
                setTimeout(function() {
                    frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
                }, 2000);
            }
        }
    },
    yes_or_no: function(frm) {
        if (frm.doc.yes_or_no == 'Yes') {
            frm.set_df_property('msme_no', 'reqd', 1);
            frm.set_df_property('type_microsmallmedium', 'reqd', 1);
            frm.toggle_display('msme_no', true);
            frm.toggle_display('type_microsmallmedium', true);
        } else {
            frm.set_df_property('msme_no', 'reqd', 0);
            frm.set_df_property('type_microsmallmedium', 'reqd', 0);
            frm.toggle_display('msme_no', false);
            frm.toggle_display('type_microsmallmedium', false);
        }
        frm.refresh_field('msme_no');
        frm.refresh_field('type_microsmallmedium');
        frm.refresh_field('gst_no');
    },
    statefrm: function(frm) {
        // Trigger validation on state change if GST number is already entered
        if (frm.doc.gst_no && frm.doc.statefrm){
            frm.trigger('gst_no');
        }
    },
    state1: function(frm) {
        // Trigger validation on state change if GST number is already entered
        if (frm.doc.gst_no1 && frm.doc.state1){
            frm.trigger('gst_no1');
        }
    }
    });

    // frappe.ui.form.on('Address Details', {
    //     validate: function(frm) {
    //         // Initialize a variable to track validation status
    //         let validationFailed = false;
            
    //         // Iterate through each child row
    //         frm.doc.address_details.forEach(function(child) {
    //             // Validate Pin Code
    //             if (child.pin_code) {
    //                 var pinRegex = /^[1-9][0-9]{5}$/;
    //                 if (!pinRegex.test(child.pin_code)) {
    //                     frappe.msgprint(__("Pin Code format is incorrect. Please enter a valid Pin Code."));
    //                     validationFailed = true;
    //                 }
    //             }
    
    //             // Validate Mobile Number / Landline Number
    //             if (child.mobile_no_landline_no) {
    //                 var mobileRegex = /^\d{10}$/;
    //                 if (!mobileRegex.test(child.mobile_no_landline_no)) {
    //                     frappe.msgprint(__("Mobile Number / Landline Number is invalid. Please enter a valid 10-digit mobile number."));
    //                     validationFailed = true;
    //                 }
    //             }
    
    //             // Validate Alternate Mobile Number
    //             if (child.alternate_mobile_no) {
    //                 var mobileRegex1 = /^\d{10}$/;
    //                 if (!mobileRegex1.test(child.alternate_mobile_no)) {
    //                     frappe.msgprint                    // frm.toggle_display('gst_details_section', true);
// (__("Alternate Mobile Number is invalid. Please enter a valid 10-digit mobile number."));
    //                     validationFailed = true;
    //                 }
    //             }
    
    //             // Validate Email
    //             if (child.mail) {
    //                 var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //                 if (!emailRegex.test(child.mail)) {
    //                     frappe.msgprint(__("Please enter a valid email address."));
    //                     validationFailed = true;
    //                 }
    //             }
    //         });
    
    //         // Prevent saving if any validation failed
    //         if (validationFailed) {
    //             // Stop the save process
    //             frappe.validated = false;
    //         }
    //     }
    // });
    

