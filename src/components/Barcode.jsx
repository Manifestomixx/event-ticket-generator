import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

const Barcode = ({ value }) => {
  const barcodeRef = useRef(null);

  // Function for barcode numbers format
  const formatBarcodeNumber = (num) => {
    return num.replace(/(\d)(\d{3})(\d{3})(\d{3})(\d{3})/, "$1  $2  $3  $4  $5");
  };

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        displayValue: false, 
        lineColor: "#FFFFFF", 
        background: "transparent",
        height: 50, 
        width: 2,
        margin: 0, 
      });
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center mt-12 md:mt-[3rem]">
      
      <svg ref={barcodeRef} className="w-full h-[100px]"></svg>

      <p className="text-white text-lg tracking-widest -mt-4 md:mt-[0px]">
        {formatBarcodeNumber(value)}
      </p>
    </div>
  );
};

export default Barcode;
