#Project Name: Veterinary Drug Dosage Calculation System dosecalculate.me
1. Introduction
This project was developed to help veterinarians quickly and accurately calculate the correct drug dosages for cats and dogs. After entering the animal type and weight, the user can learn the required dose according to the concentration of the selected drugs.

2. Technologies Used
JavaScript (React): A dynamic user interface was created using React. The state and side effects of the components are managed with React's useState and useEffect hooks.

HTML & CSS: Used for interface design and style. A responsive structure is targeted, so it can be used on different devices.

JSON: Drug and dosage information is stored in JSON format. This data is used dynamically for drug selection and calculation processes.

3. Project Structure
The project has the following basic file and folder structure:

src/components/

DoseCalculator.jsx: It is the main component for the dose calculation process. It takes the animal's weight from the user and calculates the dose according to the selected drug.
MedicineAccordion.jsx: This is the component where all drugs are listed and filtered.

Navbar.jsx: Provides the menu structure at the top of the application.

src/medicines.json: This file contains the names of all drugs, their concentrations, and dosage information according to animal species. An example JSON structure is as follows:

{
"id": 1,
"name": "Paracetamol",
"concentrations": {
"250mg/ml": {
"medicineMl": 5,
"medicineMg": 250
}
},
"dose": {
"Cat": {
"Analgesic": {
"IV": {
"doseType": "dosePerKg",
"doseValue": 2,
"unit": "mg"
}
}
}
}
}

4. Drug Dosage Calculation Logic
DoseCalculator.jsx component calculates the dosage of the drug selected by the user, taking into account the animal's weight and drug concentration.

Fixed Dose: If the drug information in the JSON contains a fixed dose (fixedDose), that dose value is used directly.

Per Kg Dose: If the dose of the drug is specified per kg (dosePerKg), the required dose is calculated by multiplying it with the weight entered by the user.

Concentration: The concentration of the drug (mg/ml) is also taken into account in the calculations and the final value is determined in ml.

5. User Interface
The application offers a simple user interface consisting of drug selection, animal type and weight input. When the Calculate button is pressed, the dosage result is calculated and presented to the user.

Steps:

Select the animal type (Cat or Dog).
Select the relevant drug.
Enter the weight of the animal.
View the results by clicking the "Calculate" button.
6. Important Components

1. DoseCalculator.jsx
Task:

This component calculates the required dose by taking the animal's weight and the selected drug from the user.
Calculates different drug options and doses according to the user's animal type.
Provides dynamic data management with useState and useEffect hooks. Matches the JSON data of the drug with the input information.
Main Functions:

Weight and dosage calculation: Multiplies the drug data with the data received from the user and determines the dose.
Calculation Result: The result is calculated with parameters such as dose, mg/kg or fixed dose and is shown on the screen.

2. MedicineAccordion.jsx
Task:

It pulls the drug data from the JSON file and presents a list for the user to choose from.

It categorizes all drugs and filters them according to the user's selection. It allows filtering in categories such as drug, organ, treatment method.
Main Functions:

Drug Filtering: Shows suitable drugs according to animal type, organ and treatment method.
Dynamic Listing: Dynamically brings the data in JSON to the user interface.

3. Navbar.jsx
Task:

Creates the application's menu and provides access to other pages.
It offers the user options to navigate to different sections of the application.
Main Functions:

Navigation: Allows switching between different pages in the menu. There are buttons or links in the menu component.

4. App.js
Task:

It is the main component of the application, combines other components and manages routing operations.
It brings together components such as Navbar, DoseCalculator and MedicineAccordion.
Main Functions:

Component Merger: Calls and organizes all components.
Routing: Allows switching between the menu and other components in the user interface.

5. medicines.json
Task:

It is a JSON file containing all drugs, dosage information and concentrations.
It contains drug information and dosage types (mg/kg, fixed dose, etc.) according to animal species.
Main Functions:

Drug Data: Drug names, dosage information and concentrations are stored in JSON format.
Dynamic Data Usage: It enables the calculation of drug dosages by using DoseCalculator and MedicineAccordion components.

7. Data Management with JSON File
Drug data used in the project is kept in the src/medicines.json file. For each drug, various dosage types (fixedDose, dosePerKg) and concentration information are defined. This data is used during drug selection.
