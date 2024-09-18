import React, { useState } from "react";
import "../MlCalculator.css";

const MlCalculator = () => {
    const [mgValue, setMgValue] = useState(""); // Hedef mg değeri
    const [totalMl, setTotalMl] = useState(""); // Toplam ml
    const [totalMg, setTotalMg] = useState(""); // Toplam mg
    const [calculatedMl, setCalculatedMl] = useState(""); // Hesaplanan ml

    const calculateMl = () => {
        const mg = parseFloat(mgValue);
        const ml = parseFloat(totalMl);
        const mgTotal = parseFloat(totalMg);

        if (isNaN(mg) || isNaN(ml) || isNaN(mgTotal) || ml <= 0 || mgTotal <= 0) {
            setCalculatedMl("Geçersiz değer.");
            return;
        }

        const result = (mg / mgTotal) * ml;
        setCalculatedMl(result.toFixed(2));
    };

    return (
        <div className="ml-calculator">
            <h2 style={{ textAlign: "center" }}>İlaç Ml Hesaplayıcı</h2>
            <div>
                <input
                    type="number"
                    placeholder="Mg Sonucu"
                    value={mgValue}
                    onChange={(e) => setMgValue(e.target.value)}
                    style={{ textAlign: "center" }}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Elindeki İlacın Ml' si"
                    value={totalMl}
                    onChange={(e) => setTotalMl(e.target.value)}
                    style={{ textAlign: "center" }}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Elindeki İlacın Mg' ı"
                    value={totalMg}
                    onChange={(e) => setTotalMg(e.target.value)}
                    style={{ textAlign: "center" }}
                />
            </div>
            <div>
                <button style={{ borderRadius: "5px" }} onClick={calculateMl}>Hesapla</button>
            </div>
            <div>
                <p>Gerekli ml: {calculatedMl}</p>
            </div>
        </div>
    );
};

export default MlCalculator;
