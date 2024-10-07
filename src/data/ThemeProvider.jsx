import React, { useState, useEffect} from 'react';
import { request, gql } from 'graphql-request'

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [categorizedItems, setCategorizedItems] = useState({});
  const [imageColor] = useState('black')
  const [displayItems, setDisplayItems] = useState([]);
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
      console.log(data)
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
  return (
    <MyContext.Provider value={{ categorizedItems, setCategorizedItems, imageColor, displayItems, setDisplayItems }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ThemeProvider };
