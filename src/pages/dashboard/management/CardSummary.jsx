import { formatNumberForDisplay } from "../../../share-components/Helper";

export const CardSummary = () => {
  const labelCard = ["Today", "This Month", "This Year (Fiscal Year)"];

  const kwhCard = [
    {
      label: "Total kWh",
      todayValue: 40.44,
      thisMonthValue: 24007.8,
      thisYearValue: 21167.8,
      unit: "kWh",
    },
    {
      label: "PLN kWh",
      todayValue: 64.44,
      thisMonthValue: 38898.8,
      thisYearValue: 3321.8,
      unit: "kWh",
    },
    {
      label: "PV kWh",
      todayValue: 124.44,
      thisMonthValue: 9878.8,
      thisYearValue: 213.8,
      unit: "kWh",
    },
  ];

  const costCard = [
    {
      label: "PLN Cost",
      todayValue: 67.018,
      thisMonthValue: 39003768,
      thisYearValue: 44551176,
      unit: "Rp",
    },
  ];

  const expenseCard = [
    {
      label: "REC Expense",
      todayValue: 2657543,
      thisMonthValue: 5223113,
      thisYearValue: 8122456,
      unit: "Rp",
    },
  ];

  const incomeCard = [
    {
      label: "PV Income",
      todayValue: 0.54,
      thisMonthValue: 329.65,
      thisYearValue: 374.48,
      unit: "Rp",
    },
  ];

  const emissionCard = [
    {
      label: "Emission",
      todayValue: 56.3,
      thisMonthValue: 29801.32,
      thisYearValue: 330912.55,
      unit: "Ton",
    },
  ];

  const eeiCard = [
    {
      label: "EEI",
      todayValue: 0.0,
      thisMonthValue: 2.34,
      thisYearValue: 2.92,
      unit: "kWh/m²",
    },
  ];

  const renderCards = (cards) =>
    cards.map((card, cardIndex) => (
      <div
        key={`card-${cardIndex}`}
        className="flex flex-col w-[160px] border-b border-gray-300"
      >
        {/* Header */}
        <div className="bg-hijau text-dongker h-10 flex items-center justify-center font-bold uppercase">
          {card.label}
        </div>

        {/* Data */}
        <div className="bg-black bg-opacity-60 flex flex-col text-center">
          <div className="h-10 flex items-center justify-center border-b border-gray-300">
            {card.unit === "Rp" ? (
              <>
                {card.unit} {formatNumberForDisplay(card.todayValue)}
              </>
            ) : (
              <>
                {formatNumberForDisplay(card.todayValue)} {card.unit}
              </>
            )}
          </div>
          <div className="h-10 flex items-center justify-center border-b border-gray-300">
            {card.unit === "Rp" ? (
              <>
                {card.unit} {formatNumberForDisplay(card.thisMonthValue)}
              </>
            ) : (
              <>
                {formatNumberForDisplay(card.thisMonthValue)} {card.unit}
              </>
            )}
          </div>
          <div className="h-10 flex items-center justify-center">
            {card.unit === "Rp" ? (
              <>
                {card.unit} {formatNumberForDisplay(card.thisYearValue)}
              </>
            ) : (
              <>
                {formatNumberForDisplay(card.thisYearValue)} {card.unit}
              </>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="flex flex-col gap-4 text-xs">
      {/* Header Row */}
      <div className="flex">
        <div className="flex flex-col">
          <div className="bg-transparent text-black h-10 flex items-center justify-center uppercase font-bold">
            {/* Empty header */}
          </div>
          {labelCard.map((item, index) => (
            <div
              key={`label-${index}`}
              className=" h-10 flex items-center text-left px-2 uppercase font-bold  border-gray-300"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Render Cards */}
        <div className="flex gap-2 flex-nowrap overflow-x-hidden">
          <div className="flex">{renderCards(kwhCard)}</div>
          <div className="flex">
            {renderCards(costCard)}
            {renderCards(expenseCard)}
            {renderCards(incomeCard)}
          </div>
          <div className="flex">{renderCards(emissionCard)}</div>

          <div className="flex">{renderCards(eeiCard)}</div>
        </div>
      </div>
    </div>
  );
};
