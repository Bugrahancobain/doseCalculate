import React, { useState, useEffect } from "react";
import MedicineAccordion from "./MedicineAccordion";
import medicinesData from "../../data/medicines.json";

const MedicineList = ({ searchTerm }) => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    setMedicines(medicinesData);
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedicineClick = (medicineId) => {
    setSelectedMedicine(selectedMedicine === medicineId ? null : medicineId);
  };

  return (
    <div className="medicineList">
      {searchTerm && filteredMedicines.length > 0 ? (
        filteredMedicines.map((medicine) => (
          <div key={medicine.id}>
            <button onClick={() => handleMedicineClick(medicine.id)}>
              {medicine.name}
            </button>
            <div
              className={`accordion-content ${selectedMedicine === medicine.id ? "open" : ""}`}
            >
              {selectedMedicine === medicine.id && (
                <MedicineAccordion key={selectedMedicine} medicine={medicine} />
              )}
            </div>
          </div>
        ))
      ) : (<MedicineAccordion key={selectedMedicine} />
      )}
    </div>
  );
};

export default MedicineList;
