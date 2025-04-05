const { KnowledgeItem, Tag } = require('./models'); 
const faker = require('faker'); 
const { Op } = require('sequelize');

const tags = [
  "cardiology", 
  "oncology", 
  "radiology", 
  "internal medicine",
  "neurology", 
  "pediatrics", 
  "dermatology", 
  "surgery", 
  "gynecology", 
  "psychiatry"
];
async function createSampleData() {
    // Generate 100 sample knowledge items
    for (let i = 0; i < 100; i++) {
        const randomTags = faker.random.arrayElements(tags, faker.datatype.number({ min: 1, max: 3 })) || [tags[0]]; // at least one
          
      // Create knowledge item
        const item = await KnowledgeItem.create({
        title: faker.lorem.words(),
        subtitle: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        vettedDate: faker.date.past(),
      });
  
      // Create tags and connect them with the knowledge item
        const tagInstances = await Promise.all(
        randomTags.map(async (tagText) => {
          const [tag] = await Tag.findOrCreate({ where: { tag: tagText } });
          return tag;
        })
      );
  
        await item.setTags(tagInstances);
        console.log(`Created item #${i + 1}`);
    }
  
    console.log('Sample data created!');
  }
  /* createSampleData()
    .catch(err => console.error('Error creating sample data:', err));*/
    
module.exports = createSampleData;
