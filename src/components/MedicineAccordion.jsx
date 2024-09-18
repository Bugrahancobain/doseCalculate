import React, { useState, useEffect } from 'react';
import medicinesData from '../../data/medicines.json';

const DoseCalculator = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [dose, setDose] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [resultTime, setResultTime] = useState('');
  const [error, setError] = useState('');
  const [selectedConcentration, setSelectedConcentration] = useState('');
  const [concentrationOptions, setConcentrationOptions] = useState([]);

  useEffect(() => {
    setMedications(medicinesData);
    setFilteredMedications(medicinesData);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedications(filtered);
    } else {
      setFilteredMedications([]);
    }
  }, [searchTerm, medications]);

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    setSearchTerm(medication.name);
    setFilteredMedications([]);
    setSelectedAnimal('');
    setSelectedOrgan('');
    setSelectedMethod('');
    setDose('');
    setWeight('');
    setResult('');
    setResultTime('');
    setError('');
    setSelectedConcentration('');
    setConcentrationOptions(Object.keys(medication.concentrations || {}));
  };

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
    setSelectedOrgan('');
    setSelectedMethod('');
    setDose('');
    setWeight('');
    setResult('');
    setResultTime('');
    setError('');
  };

  const handleOrganChange = (e) => {
    setSelectedOrgan(e.target.value);
    setSelectedMethod('');
    setDose('');
    setWeight('');
    setResult('');
    setResultTime('');
    setError('');
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    setDose('');
    setWeight('');
    setResult('');
    setResultTime('');
    setError('');
  };

  const handleDoseChange = (e) => {
    const value = e.target.value;
    const doseData = selectedMedication?.dose?.[selectedAnimal]?.[selectedOrgan]?.[selectedMethod];

    if (doseData?.doseType === 'dosePerKgRange' && (value < doseData.doseValue[0] || value > doseData.doseValue[1])) {
      setDose("")
    } else if (doseData?.doseType === 'dosePerKg' && value != doseData.doseValue) {
      setDose("")
    } else if (doseData?.doseType === 'fixedDose' && value != doseData.doseValue) {
      setDose("")
    } else if (doseData?.doseType === 'dosePerUnit' && (value < doseData.doseValue[0] || value > doseData.doseValue[1])) {
      setDose("")
    } else {
      setError('');
      setDose("")
    }
    setDose(value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleConcentrationChange = (e) => {
    setSelectedConcentration(e.target.value);
  };

  const handleCalculate = () => {
    if (!selectedMedication || !selectedAnimal || !selectedMethod || !dose || !weight) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const doseData = selectedMedication?.dose?.[selectedAnimal]?.[selectedOrgan]?.[selectedMethod];

    let calculatedDose;
    let timeInfo = '';

    if (doseData?.doseType === 'dosePerKgRange') {
      if (dose < doseData.doseValue[0] || dose > doseData.doseValue[1]) {
        setError(`Doz aralığı ${doseData.doseValue[0]} - ${doseData.doseValue[1]} olmalı.`);
        setDose("")
        return;
      }
      calculatedDose = dose * weight;
    } else if (doseData?.doseType === 'dosePerKg') {
      if (dose != doseData.doseValue) {
        setError(`Doz ${doseData.doseValue} olmalı.`);
        setDose("")
        return;
      }
      calculatedDose = doseData.doseValue * weight;
    } else if (doseData?.doseType === 'fixedDose') {
      if (dose != doseData.doseValue) {
        setError(`Doz ${doseData.doseValue} olmalı.`);
        setDose("")
        return;
      }

      calculatedDose = doseData.doseValue;
    } else if (doseData?.doseType === 'dosePerUnit') {
      if (dose < doseData.doseValue[0] || dose > doseData.doseValue[1]) {
        setError(`Doz aralığı ${doseData.doseValue[0]} - ${doseData.doseValue[1]} olmalı.`);
        setDose("")
        return;
      }
      calculatedDose = dose;
    } else {
      setError('Doz bilgisi bulunamadı.');
      return;
    }

    if (doseData.time) {
      timeInfo = `Uygulama sıklığı: ${doseData.time}`;
    }

    const unit = doseData.unit || 'mg';
    setResult(`${calculatedDose} ${unit}`);
    setResultTime(timeInfo);
    setError('');

    if (selectedConcentration && selectedMedication.concentrations[selectedConcentration]) {
      const { medicineMl, medicineMg, unit: concentrationUnit } = selectedMedication.concentrations[selectedConcentration];
      const concentrationRatio = medicineMl / medicineMg;
      const requiredCc = dose * concentrationRatio;
      setResult(prevResult => `${prevResult} | Gerekli Miktar: ${requiredCc.toFixed(2)} ${concentrationUnit || 'cc'}`);
    }
  };


  const getPlaceholder = () => {


    const doseData = selectedMedication?.dose?.[selectedAnimal]?.[selectedOrgan]?.[selectedMethod];

    if (doseData?.doseType === 'dosePerKgRange') {
      return `Gerekli Doz: ${doseData.doseValue[0]} - ${doseData.doseValue[1]}`;
    } else if (doseData?.doseType === 'dosePerKg') {
      return `Gerekli Doz: ${doseData.doseValue}`;
    } else if (doseData?.doseType === 'fixedDose') {
      return `Gerekli Doz: ${doseData.doseValue}`;
    } else if (doseData?.doseType === 'dosePerUnit') {
      return `Gerekli Doz: ${doseData.doseValue[0]} - ${doseData.doseValue[1]}`;
    }

    return 'Gerekli Doz: ';
  };

  return (
    <div className="dose-calculator">
      <div className="form-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="İlaç Adını Aratın..."
          className="form-control"
        />
        {searchTerm && filteredMedications.length > 0 && (
          <div className="suggestions">
            <ul>
              {filteredMedications.map(med => (
                <li className="suggestionItem"
                  key={med.id}
                  onClick={() => handleMedicationSelect(med)}
                >
                  {med.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedMedication && (
        <div className="details">
          <select value={selectedAnimal} onChange={handleAnimalChange} className="form-control">
            <option value="">Hayvan Türü Seçin</option>
            {Object.keys(selectedMedication.dose).map(animal => (
              <option key={animal} value={animal}>{animal}</option>
            ))}
          </select>

          {selectedAnimal && (
            <select value={selectedOrgan} onChange={handleOrganChange} className="form-control">
              <option value="">Tedavi Bölgesi</option>
              {Object.keys(selectedMedication.dose[selectedAnimal]).map(organ => (
                <option key={organ} value={organ}>{organ}</option>
              ))}
            </select>
          )}

          {selectedOrgan && (
            <select value={selectedMethod} onChange={handleMethodChange} className="form-control">
              <option value="">Yöntem Seçin</option>
              {Object.keys(selectedMedication.dose[selectedAnimal][selectedOrgan]).map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          )}

          {selectedMethod && (
            <div className="dose-input">
              <input
                type="number"
                value={dose}
                onChange={handleDoseChange}
                placeholder={dose === '' ? getPlaceholder() : ''}
                className={`form-control ${error ? 'error' : ''}`}
              />
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                placeholder="Kilo (kg)"
                className={`form-control ${error ? 'error' : ''}`}
              />
              {concentrationOptions.length > 0 && (
                <select value={selectedConcentration} onChange={handleConcentrationChange} className="form-control">
                  <option value="">Elindeki İlacı Seçin</option>
                  {concentrationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              <button onClick={handleCalculate} className="btn btn-primary">Hesapla</button>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="result">
          <div>Gerekli Doz: {result}</div>
          {resultTime && <div>{resultTime}</div>}
        </div>
      )}

      {error && <div style={{ color: "red" }} className="error">{error}</div>}
    </div>
  );
};

export default DoseCalculator;
