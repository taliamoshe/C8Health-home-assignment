const { KnowledgeItem, Tag } = require('./models'); 
const faker = require('faker'); 
const { Op } = require('sequelize');

const tags = [
  "cardiology", "oncology", "radiology", "internal medicine",
  "neurology", "pediatrics", "dermatology", "surgery",
  "gynecology", "psychiatry"
];

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createSampleData() {
  for (let i = 0; i < 100; i++) {
    try {
      const randomTags = faker.random.arrayElements(tags, faker.datatype.number({ min: 1, max: 3 })) || [tags[0]];

      const item = await KnowledgeItem.create({
        title: faker.lorem.words(),
        subtitle: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        vettedDate: faker.date.past(),
      });

      const tagInstances = await Promise.all(
        randomTags.map(async (tagText) => {
          const [tag] = await Tag.findOrCreate({ where: { tag: tagText } });
          return tag;
        })
      );

      await item.setTags(tagInstances);
      console.log(`✅ Created item #${i + 1}`);

      await wait(50);

    } catch (err) {
      console.error(`❌ Error creating item #${i + 1}:`, err.message);
    }
  }

  console.log('🎉 Sample data created!');
}

module.exports = createSampleData;
