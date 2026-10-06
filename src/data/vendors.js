const vendors = [
  {
    id: 'zafran-kitchen',
    name: "Zafran's Kitchen",
    location: 'Mahallah Ali, Central Food Court',
    openHours: '8:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'zk-1',
        name: 'Nasi Ayam Penyet Berempah',
        description: 'Crispy spiced fried chicken served with fragrant rice, signature sambal terasi, tempeh and tofu',
        price: 9.50,
        category: 'Rice',
        available: true,
        special: true
      },
      {
        id: 'zk-2',
        name: 'Nasi Kukus Ayam Dara',
        description: 'Steamed white rice paired with crispy fried chicken, rich herb curry gravy and sambal belacan',
        price: 9.00,
        category: 'Rice',
        available: true,
        special: false
      },
      {
        id: 'zk-3',
        name: 'Nasi Lemak Sambal Sotong',
        description: 'Coconut fragrant rice with spicy chili squid, boiled egg, roasted peanuts and crispy anchovies',
        price: 8.50,
        category: 'Rice',
        available: true,
        special: false
      },
      {
        id: 'zk-4',
        name: 'Mee Goreng Mamak Special',
        description: 'Wok-tossed yellow noodles with shredded chicken, bean sprouts, tofu cubes and calamansi lime',
        price: 7.00,
        category: 'Noodles',
        available: true,
        special: false
      },
      {
        id: 'zk-5',
        name: 'Kuey Teow Ladna Seafood',
        description: 'Flat rice noodles smothered in silky egg gravy with prawns, fish cakes and bok choy',
        price: 8.50,
        category: 'Noodles',
        available: true,
        special: false
      },
      {
        id: 'zk-6',
        name: 'Teh Tarik Madu Ais',
        description: 'Rich frothy pulled milk tea infused with raw wild honey and ice',
        price: 3.50,
        category: 'Drinks',
        available: true,
        special: false
      },
      {
        id: 'zk-7',
        name: 'Air Bandung Cincau',
        description: 'Refreshing rose syrup beverage with evaporated milk and grass jelly strips',
        price: 3.00,
        category: 'Drinks',
        available: true,
        special: false
      },
      {
        id: 'zk-8',
        name: 'Pisang Goreng Cheese Crispy',
        description: 'Golden batter-fried banana fritters topped with generous grated cheddar cheese and condensed milk',
        price: 5.00,
        category: 'Snacks',
        available: true,
        special: false
      }
    ]
  },
  {
    id: 'kafe-ali',
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'ali-1',
        name: 'Nasi Kandar Ayam Bawang',
        description: 'Steamed rice flooded with mixed gravies and caramelized onion fried chicken',
        price: 8.50,
        category: 'Rice',
        available: true,
        special: true
      },
      {
        id: 'ali-2',
        name: 'Maggi Goreng Double',
        description: 'Fried instant noodles seasoned with spices, veggies, and topped with sunny-side up egg',
        price: 6.50,
        category: 'Noodles',
        available: true,
        special: false
      },
      {
        id: 'ali-3',
        name: 'Roti Canai Telur Goyang',
        description: 'Crispy flaky flatbread served with two soft poached eggs, dhal and sambal',
        price: 4.50,
        category: 'Roti',
        available: true,
        special: false
      },
      {
        id: 'ali-4',
        name: 'Milo Ais Dinosaur',
        description: 'Chilled chocolate malt drink crowned with extra heaped spoonfuls of undissolved Milo powder',
        price: 3.80,
        category: 'Drinks',
        available: true,
        special: false
      }
    ]
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Block D Cafeteria',
    openHours: '8:00 am - 9:00 pm',
    isOpen: false,
    menu: [
      {
        id: 'ami-1',
        name: 'Laksa Johor Tradisi',
        description: 'Spaghetti noodles in aromatic spiced fish gravy garnished with fresh herbs and calamansi',
        price: 8.00,
        category: 'Noodles',
        available: true,
        special: true
      },
      {
        id: 'ami-2',
        name: 'Nasi Kerabu Ayam Percik',
        description: 'Blue pea flower rice with grilled chicken in rich coconut percik glaze, budu and ulam-ulaman',
        price: 10.00,
        category: 'Rice',
        available: false,
        special: false
      },
      {
        id: 'ami-3',
        name: 'Sirap Limau Selasih',
        description: 'Iced rose cordial with freshly squeezed lime juice and basil seeds',
        price: 2.50,
        category: 'Drinks',
        available: true,
        special: false
      }
    ]
  }
];

export default vendors;
