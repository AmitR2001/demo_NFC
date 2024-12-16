document.getElementById('writeButton').addEventListener('click', async () => {
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bloodType = document.getElementById('bloodType').value;
    const drugAllergies = document.getElementById('drugAllergies').value;
    const foodAllergies = document.getElementById('foodAllergies').value;
    const environmentalAllergies = document.getElementById('environmentalAllergies').value;
    const diabetes = document.getElementById('diabetes').value;
    const hypertension = document.getElementById('hypertension').value;
    const asthma = document.getElementById('asthma').value;
    const heartDisease = document.getElementById('heartDisease').value;
    const kidneyDisease = document.getElementById('kidneyDisease').value;
    const currentMedications = document.getElementById('currentMedications').value;
    const medicationChanges = document.getElementById('medicationChanges').value;
    const surgeries = document.getElementById('surgeries').value;
    const illnesses = document.getElementById('illnesses').value;
    const emergencyContactName = document.getElementById('emergencyContactName').value;
    const emergencyContactRelationship = document.getElementById('emergencyContactRelationship').value;
    const emergencyContactPhone = document.getElementById('emergencyContactPhone').value;
    const tetanus = document.getElementById('tetanus').value;
    const covid19 = document.getElementById('covid19').value;
    const otherImmunizations = document.getElementById('otherImmunizations').value;
    const smoker = document.getElementById('smoker').value;
    const alcohol = document.getElementById('alcohol').value;
    const dietaryRestrictions = document.getElementById('dietaryRestrictions').value;
    const physicianName = document.getElementById('physicianName').value;
    const physicianContact = document.getElementById('physicianContact').value;
    const insuranceProvider = document.getElementById('insuranceProvider').value;
    const insurancePolicy = document.getElementById('insurancePolicy').value;

    const message = `
        Basic Patient Information
        FullName: ${fullName}
        Age: ${age}
        Gender: ${gender}
        BloodType: ${bloodType}

        Allergies
        Drug: ${drugAllergies}
        Food: ${foodAllergies}
        Environmental: ${environmentalAllergies}

        Chronic Conditions
        Diabetes: ${diabetes}
        Hypertension: ${hypertension}
        Asthma: ${asthma}
        Heart Disease: ${heartDisease}
        Kidney Disease: ${kidneyDisease}

        Medications
        Current: ${currentMedications}
        Changes: ${medicationChanges}

        Past Medical History
        Surgeries: ${surgeries}
        Illnesses: ${illnesses}

        Emergency Contact
        Name: ${emergencyContactName}
        Relationship: ${emergencyContactRelationship}
        Phone: ${emergencyContactPhone}

        Immunization Records
        Tetanus: ${tetanus}
        COVID-19: ${covid19}
        Other: ${otherImmunizations}

        Lifestyle Factors (Optional)
        Smoker: ${smoker}
        Alcohol: ${alcohol}
        Dietary Restrictions: ${dietaryRestrictions}

        Physician Details
        Name: ${physicianName}
        Contact: ${physicianContact}

        Insurance Information
        Provider: ${insuranceProvider}
        Policy: ${insurancePolicy}
    `;

    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.write(message).then(() => {
                document.getElementById('message').textContent = 'Message written.';
            }).catch(error => {
                document.getElementById('message').textContent = `Write failed :-( try again: ${error}.`;
            });
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});

document.getElementById('readButton').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    document.getElementById('message').textContent = `NFC Tag contains: ${decoder.decode(record.data)}`;
                }
            };
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});
