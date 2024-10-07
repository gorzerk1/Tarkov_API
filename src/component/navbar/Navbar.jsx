import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../data/ThemeProvider';
import './navbar.scss';

function Navbar() {
  const [filteredCategories, setFilteredCategories] = useState({});
  const [selectedItem, setSelectedItem] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('AllLvl');
  const [selectedTrader, setSelectedTrader] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [imageColor] = useState('black');
  const { categorizedItems, setDisplayItems } = useContext(MyContext);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleLevelClick = (item) => {
    setSelectedLevel(item);
  };
  const handleTraderClick = (item) => {
    setSelectedTrader(item);
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    let filtered = {};

    Object.keys(categorizedItems).forEach((category) => {
      filtered[category] = categorizedItems[category].filter((item) => {
        const traderName = item.trader?.name || '';
        const requiredLevel = item.requiredLevel || '';

        const matchesTrader =
          selectedTrader === 'All' || traderName === selectedTrader;
        const matchesLevel =
          selectedLevel === 'AllLvl' ||
          requiredLevel.toString() === selectedLevel;
        return matchesTrader && matchesLevel;
      });
    });

    setFilteredCategories(filtered);
  }, [selectedTrader, selectedLevel, categorizedItems]);

  useEffect(() => {
    let searchFiltered = {};

    Object.keys(filteredCategories).forEach((category) => {
      searchFiltered[category] = filteredCategories[category].filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
    });

    if (selectedItem === 'All') {
      const combinedItems = Object.values(searchFiltered).flat();
      setDisplayItems(combinedItems);
    } else {
      const categoryItems = searchFiltered[selectedItem] || [];
      setDisplayItems(categoryItems);
    }
  }, [selectedItem, filteredCategories, searchText,setDisplayItems]);


  return (
    <div className="Navbar">
      <div className="Navbar__Settings">
        <div className="Navbar__Settings__Traders">
          <div className="Navbar__Settings__Traders__Text">
            <div className="Navbar__Settings__Traders__Text--LvlText">
              Trader level:
            </div>
            <div className="Navbar__Settings__Traders__Text--LvlText1">
              Category:
            </div>
          </div>
          <div className="Navbar__Settings__Traders__Level">
            <div
              className={`Navbar__Settings__Traders__Level--${
                selectedLevel === 'AllLvl' ? 'boxSelected1' : 'box1'
              }`}
              onClick={() => handleLevelClick('AllLvl')}
            >
              <img src={`../../all_levels_${imageColor}.png `} alt="" />
            </div>
            <div
              className={`Navbar__Settings__Traders__Level--${
                selectedLevel === '1' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleLevelClick('1')}
            >
              <img src={`../../Greak1_${imageColor}.png`} alt="" />
            </div>
            <div
              className={`Navbar__Settings__Traders__Level--${
                selectedLevel === '2' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleLevelClick('2')}
            >
              <img src={`../../Greak2_${imageColor}.png`} alt="" />
            </div>
            <div
              className={`Navbar__Settings__Traders__Level--${
                selectedLevel === '3' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleLevelClick('3')}
            >
              <img src={`../../Greak3_${imageColor}.png`} alt="" />
            </div>
            <div
              className={`Navbar__Settings__Traders__Level--${
                selectedLevel === '4' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleLevelClick('4')}
            >
              <img src={`../../Greak4_${imageColor}.png`} alt="" />
            </div>
            <div className="Navbar__Settings__Traders__Level--Category">
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'All' ? 'boxSelected1' : 'box1'
                }`}
                onClick={() => handleItemClick('All')}
              >
                <img src={`../../all_levels_${imageColor}.png`} alt="All" />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Gear' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Gear')}
              >
                <img
                  src={`../../bulletproof-vest_${imageColor}.png`}
                  alt="Gear"
                />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Weapons' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Weapons')}
              >
                <img src={`../../weapon_${imageColor}.png`} alt="weapon" />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Magazine' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Magazine')}
              >
                <img src={`../../magazine_${imageColor}.png`} alt="Magazine" />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Ammunation' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Ammunation')}
              >
                <img
                  src={`../../ammunition_${imageColor}.png`}
                  alt="Ammunation"
                />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Medical' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Medical')}
              >
                <img src={`../../medical_${imageColor}.png`} alt="Medical" />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Consumable' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Consumable')}
              >
                <img
                  src={`../../consumable_${imageColor}.png`}
                  alt="Consumable"
                />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Weapon parts & mods' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Weapon parts & mods')}
              >
                <img
                  src={`../../weapon_part_${imageColor}.png`}
                  alt="Weapon parts & mods"
                />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Keys' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Keys')}
              >
                <img src={`../../key_${imageColor}.png`} alt="Keys" />
              </div>
              <div
                className={`Navbar__Settings__Traders__Level--Category--${
                  selectedItem === 'Other' ? 'boxSelected' : 'box'
                }`}
                onClick={() => handleItemClick('Other')}
              >
                <img src={`../../other_${imageColor}.png`} alt="Other" />
              </div>
            </div>
          </div>

          <div className="Navbar__Settings__Traders--TraderText">Trader:</div>
          <div className="Navbar__Settings__Traders__Trader">
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Prapor' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Prapor')}
            >
              Prapor
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Therapist' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Therapist')}
            >
              Therapist
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Skier' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Skier')}
            >
              Skier
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Peacekeeper' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Peacekeeper')}
            >
              Peacekeeper
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Mechanic' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Mechanic')}
            >
              Mechanic
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Ragman' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Ragman')}
            >
              Ragman
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'Jaeger' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('Jaeger')}
            >
              Jaeger
            </div>
            <div
              className={`Navbar__Settings__Traders__Trader--${
                selectedTrader === 'All' ? 'boxSelected' : 'box'
              }`}
              onClick={() => handleTraderClick('All')}
            >
              All
            </div>
            <div className="Navbar__Settings__Traders__Trader__SearchBar">
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search for an item."
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
