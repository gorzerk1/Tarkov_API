import React,{useState, useEffect, useContext} from 'react';
import { request, gql } from 'graphql-request'
import { MyContext } from '../../data/ThemeProvider'
import './main.scss';

function Main() {
  const { setCategorizedItems, imageColor,displayItems} = useContext(MyContext);

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
  }, [setCategorizedItems]);

  
const RewardCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const levelImageMap = {
    '1': "Greak1_" + imageColor,
    '2': 'Greak2_' + imageColor,
    '3': 'Greak3_' + imageColor,
    '4': 'Greak4_' + imageColor,
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

const rewardData = displayItems.map((item, index) => (
  <RewardCard item={item} key={index} />
)) || [];

  return (
    <div className="Main">
      <div className='Main__Container'>
      <div className='Main__Container__Cards'>
        {rewardData}
      </div>
      </div>
    </div>
  );
}

export default Main;



