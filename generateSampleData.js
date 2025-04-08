const { KnowledgeItem, Tag } = require('./models');
const faker = require('faker');

const tags = [
  "cardiology", "oncology", "radiology", "internal medicine",
  "neurology", "pediatrics", "dermatology", "surgery",
  "gynecology", "psychiatry"
];

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateSampleData() {
  console.log('🔌 Connecting to DB and generating sample data...\n');

  for (let i = 0; i < 100; i++) {
    try {
      const randomTags = faker.random.arrayElements(tags, faker.datatype.number({ min: 1, max: 3 })) || [tags[0]];

      const item = await KnowledgeItem.create({
        title: faker.lorem.words(),
        subtitle: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        vettedDate: faker.date.past(),
      });

      const tagInstances = [];
      for (const tagText of randomTags) {
        const [tag] = await Tag.findOrCreate({ where: { tag: tagText } });
        tagInstances.push(tag);
        await wait(20);
      }

      await item.setTags(tagInstances);

      console.log(`✅ Created item #${i + 1}`);
      await wait(200);

    } catch (err) {
      console.error(`❌ Error creating item #${i + 1}:`, err.message);
      await wait(300);
    }
  }

  console.log('\n🎉 Sample data created successfully!');
}

module.exports = generateSampleData;
