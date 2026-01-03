import { createSlice } from "@reduxjs/toolkit";

const contactDetailsSlice = createSlice({
    name: "contactDetails",
    initialState: {
        brandName: "BazaarWale",
        mobileNumber: "8090674352",
        whatsAppNumber: "8090674352",
        emailId: "help.bazaarwale@gmail.com",
        callingStartTime: "5AM",
        callingEndTime: "6PM",
        owner : "Anurag Kumar Singh",
        copyrightYear : "2025 - 2026",
        address: {
            houseNo: "123",
            street: "E-Commerce Plaza",
            city: "Tech City",
            pincode: "560001",
            state: "Banglore"
        },
        socialUrl: {
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
            twitter: "https://x.com/?lang=en"
        }

    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            const keys = field.split('.');
            let current = state;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
        },
        clearAll: () => {
            return contactDetailsSlice.getInitialState();
        }
    }
});



export const { updateField, clearAll } = contactDetailsSlice.actions;
export default contactDetailsSlice.reducer;