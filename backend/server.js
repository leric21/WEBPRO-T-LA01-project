const app = require("./app");
const sequelize = require("./db");
const Product = require("./models/Product");

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(async () => {
    console.log("Adatbázis létrehozva / csatlakozva");

    const count = await Product.count();

    if (count === 0) {
      await Product.bulkCreate([
        {
          name: "Laptop",
          price: 250000,
          description: "15 colos általános célú laptop"
        },
        {
          name: "Egér",
          price: 8000,
          description: "Vezeték nélküli optikai egér"
        },
        {
          name: "Billentyűzet",
          price: 15000,
          description: "Mechanikus billentyűzet"
        }
      ]);
      console.log("Mintatermékek beszúrva");
    }

    app.listen(PORT, () => {
      console.log(`Szerver fut a ${PORT} porton`);
    });
  })
  .catch((error) => {
    console.error("Adatbázis hiba:", error.message);
  });