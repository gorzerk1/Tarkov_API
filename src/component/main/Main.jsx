import React,{useState, useEffect} from 'react';
import { request, gql } from 'graphql-request'
import './main.scss';

function Main() {
  const [filteredCategories, setFilteredCategories] = useState({});
  const [categorizedItems, setCategorizedItems] = useState({});
  const [displayItems, setDisplayItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('AllLvl');
  const [selectedTrader, setSelectedTrader] = useState('All');
  const [searchText, setSearchText] = useState('');
  console.log(categorizedItems)

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
    const categoryMap = {
      'Chest rig': 'Gear',
      'Backpack': 'Gear',
      'Armor': 'Gear',
      'Headwear': 'Gear',
      'Headphones': 'Gear',
      'Armored equipment': 'Gear',
      'Silencer': 'Weapon parts & mods',
      'Scope': 'Weapon parts & mods',
      'Special scope': 'Weapon parts & mods',
      'Flashhider': 'Weapon parts & mods',
      'Mount': 'Weapon parts & mods',
      'Pistol grip': 'Weapon parts & mods',
      'Handguard': 'Weapon parts & mods',
      'Barrel': 'Weapon parts & mods',
      'Stock': 'Weapon parts & mods',
      'Charging handle': 'Weapon parts & mods',
      'Assault scope': 'Weapon parts & mods',
      'UBGL': 'Weapon parts & mods',
      'Vis. observ. device': 'Weapon parts & mods',
      'Sniper rifle': 'Weapons',
      'Assault rifle': 'Weapons',
      'Shotgun': 'Weapons',
      'Marksman rifle': 'Weapons',
      'SMG': 'Weapons',
      'Handgun': 'Weapons',
      'Machinegun': 'Weapons',
      'Assault carbine': 'Weapons',
      'Revolver': 'Weapons',
      'Grenade launcher': 'Weapons',
      'Magazine': 'Magazine',
      'Ammo': 'Ammunition',
      'Fuel': 'Consumable',
      'Food': 'Consumable',
      'Drink': 'Consumable',
      'Medical item': 'Medical',
      'Medikit': 'Medical',
      'Medical supplies': 'Medical',
      'Drug': 'Medical',
      'Stimulant': 'Medical',
      'Mechanical Key': 'Keys',
      'Keycard': 'Keys',
      'Household goods': 'Other',
      'Common container': 'Other',
      'Ammo container': 'Ammunation',
      'Tool': 'Other',
      'Jewelry': 'Other',
      'Electronics': 'Other',
      'Throwable weapon': 'Ammunation',
      'Special item': 'Other',
      'Port. container': 'Other',
      'Info': 'Other',
      'Knife': 'Weapons',
      'Locking container': 'Other',
      'Night Vision': 'Weapon parts & mods',
      'Other': 'Other'
    };
    const query = gql`
    {
      barters{
        trader{
          name
          imageLink
        }
        level
        rewardItems{
          item{
            name
            image512pxLink
            category{
              name
            }
          }
        }
        requiredItems{
          item {
            name
            image512pxLink
          }
          count
        }
      }
    }
    `;
  
    request('https://api.tarkov.dev/graphql', query)
    .then((data) => {
      let categorized = {
        'Gear': [],
        'Weapon parts & mods': [],
        'Weapons': [],
        'Magazine': [],
        'Ammunation': [],
        'Consumable': [],
        'Medical': [],
        'Keys': [],
        'Other': [],
      };
  
      data.barters.forEach(barter => {
        barter.rewardItems.forEach(rewardItem => {
          const itemWithRequiredAndTrader = {
            ...rewardItem.item,
            requiredItems: barter.requiredItems.map(ri => ({
              name: ri.item.name,
              image512pxLink: ri.item.image512pxLink,
              count: ri.count
            })),
            trader: {name:barter.trader.name, image: barter.trader.imageLink},
            requiredLevel: barter.level,
          };
  
          const category = categoryMap[rewardItem.item.category.name] || 'Other';
          categorized[category] = categorized[category] || [];
          categorized[category] = [...categorized[category], itemWithRequiredAndTrader];
        });
      });
  
      setCategorizedItems(categorized);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }, []);

  useEffect(() => {
    let filtered = {};

    Object.keys(categorizedItems).forEach(category => {
      filtered[category] = categorizedItems[category].filter(item => {
        const matchesTrader = selectedTrader === 'All' || item.trader.name === selectedTrader;
        const matchesLevel = selectedLevel === 'AllLvl' || item.requiredLevel.toString() === selectedLevel;
        return matchesTrader && matchesLevel;
      });
    });

    setFilteredCategories(filtered);
  }, [selectedTrader, selectedLevel, categorizedItems]);

  useEffect(() => {
    let searchFiltered = {};

    Object.keys(filteredCategories).forEach(category => {
      searchFiltered[category] = filteredCategories[category].filter(item => 
          item.name.toLowerCase().includes(searchText)
      );
    });

    if (selectedItem === 'All') {
      // When 'All' is selected, flatten all categories into one array
      const combinedItems = Object.values(searchFiltered).flat();
      setDisplayItems(combinedItems);
    } else {
      // For specific categories
      const categoryItems = searchFiltered[selectedItem] || [];
      setDisplayItems(categoryItems);
    }
  }, [selectedItem, filteredCategories, searchText]);

  
  
const RewardCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const levelImageMap = {
    '1': 'Greak1',
    '2': 'Greak2',
    '3': 'Greak3',
    '4': 'Greak4',
  };
  const levelImage = levelImageMap[item.requiredLevel.toString()] || 'default';
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    });
  };

  return (
    <div 
      className='Main__Container__Cards__RewardCard'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='Main__Container__Cards__RewardCard--Background'><img src="../../item_background.jpg" alt={item.name} /></div>
      <div className='Main__Container__Cards__RewardCard--Name'>{item.name}</div>
      <div className='Main__Container__Cards__RewardCard--TraderImage'><img src={item.trader.image} alt={item.trader.name} /></div>
      <div className='Main__Container__Cards__RewardCard--Level'><img src={`../../${levelImage}.png`} alt="" /></div>
      <img src={item.image512pxLink} alt={item.name} />
      {isHovered && (
        <div className='Main__Container__Cards__RewardCard__RequireCard'>
          {item.requiredItems.map((requireItem, idx) => (
            <div className='Main__Container__Cards__RewardCard__RequireCard--Box' key={idx} onClick={() => copyToClipboard(requireItem.name)}>
            <div className='Main__Container__Cards__RewardCard__RequireCard--Box--Image'><img src={requireItem.image512pxLink} alt={requireItem.name} /></div>
            <div className='Main__Container__Cards__RewardCard__RequireCard--Box--Text'>
                <div>{requireItem.name}</div>
                <div className='Main__Container__Cards__RewardCard__RequireCard--Box--Text--Amount'>X {requireItem.count}</div>
            </div>
        </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Map over displayItems to create individual Reward Cards
const rewardData = displayItems.map((item, index) => (
  <RewardCard item={item} key={index} />
)) || [];


  return (
    <div className="Main">
      <div className='Main__Settings'>
        <div className='Main__Settings__Traders'>
          <div className='Main__Settings__Traders__Text'>
            <div className='Main__Settings__Traders__Text--LvlText'>Trader level:</div>
            <div className='Main__Settings__Traders__Text--LvlText1'>Category:</div>
          </div>
          <div className='Main__Settings__Traders__Level'>
            <div className={`Main__Settings__Traders__Level--${selectedLevel === 'AllLvl' ? 'boxSelected1' : 'box1'}`} onClick={() => handleLevelClick('AllLvl')}>
              <img src="../../all_levels_white.png" alt="" />
            </div>
            <div className={`Main__Settings__Traders__Level--${selectedLevel === '1' ? 'boxSelected' : 'box'}`} onClick={() => handleLevelClick('1')}>
              <img src="../../Greak1_white.png" alt="" />
            </div>
            <div className={`Main__Settings__Traders__Level--${selectedLevel === '2' ? 'boxSelected' : 'box'}`} onClick={() => handleLevelClick('2')}>
              <img src="../../Greak2_white.png" alt="" />
            </div>
            <div className={`Main__Settings__Traders__Level--${selectedLevel === '3' ? 'boxSelected' : 'box'}`} onClick={() => handleLevelClick('3')}>
              <img src="../../Greak3_white.png" alt="" />
            </div>
            <div className={`Main__Settings__Traders__Level--${selectedLevel === '4' ? 'boxSelected' : 'box'}`} onClick={() => handleLevelClick('4')}>
              <img src="../../Greak4_white.png" alt="" />
            </div>
            <div className='Main__Settings__Traders__Level--Category'>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'All' ? 'boxSelected1' : 'box1'}`} onClick={() => handleItemClick('All')}>
              <img src="../../all_levels_white.png" alt="All" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Gear' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Gear')}>
              <img src="../../bulletproof-vest_43px.png" alt="Gear" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Weapons' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Weapons')}>
              <img src="../../weapon_28px.png" alt="weapon" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Magazine' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Magazine')}>
              <img src="../../magazine_35px.png" alt="Magazine" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Ammunation' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Ammunation')}>
              <img src="../../ammunition_30px.png" alt="Ammunation" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Medical' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Medical')}>
              <img src="../../medical_36px.png" alt="Medical" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Consumable' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Consumable')}>
              <img src="../../consumable_37px.png" alt="Consumable" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Weapon parts & mods' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Weapon parts & mods')}>
              <img src="../../weapon_part_39px.png" alt="Weapon parts & mods" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Keys' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Keys')}>
              <img src="../../key_37px.png" alt="Keys" />
            </div>
            <div className={`Main__Settings__Traders__Level--Category--${selectedItem === 'Other' ? 'boxSelected' : 'box'}`} onClick={() => handleItemClick('Other')}>
              <img src="../../other.png" alt="Other" />
            </div>
          </div>
          </div>

          <div className='Main__Settings__Traders--TraderText'>Trader:</div>
          <div className='Main__Settings__Traders__Trader'>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Prapor' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Prapor')}>Prapor</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Therapist' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Therapist')}>Therapist</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Skier' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Skier')}>Skier</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Peacekeeper' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Peacekeeper')}>Peacekeeper</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Mechanic' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Mechanic')}>Mechanic</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Ragman' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Ragman')}>Ragman</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'Jaeger' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('Jaeger')}>Jaeger</div>
            <div className={`Main__Settings__Traders__Trader--${selectedTrader === 'All' ? 'boxSelected' : 'box'}`} onClick={() => handleTraderClick('All')}>All</div>
            <div className='Main__Settings__Traders__Trader__SearchBar'>
            <input
            type="text"
            onChange={handleSearchChange}
            placeholder='Search for an item.'
          />
            </div>
          </div>
        </div>
      </div>
      <div className='Main__Container'>
      <div className='Main__Container__Cards'>
        {rewardData}
      </div>
      </div>
    </div>
  );
}

export default Main;



