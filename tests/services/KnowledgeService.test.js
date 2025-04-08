
//TODO- finish taking care of the errors of Mock tests
const KnowledgeService = require('../../services/KnowledgeService');

// Mock models
jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const KnowledgeItem = dbMock.define('KnowledgeItem', {
    KnowledgeItem_id: 1,
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    vettedDate: '2022-04-03',
    content: 'Test Content'
  });

  KnowledgeItem.$queryInterface.$useHandler((query) => {
    if (query === 'findOne') {
      return KnowledgeItem.build({
        KnowledgeItem_id: 1,
        title: 'Found Title',
        subtitle: 'Found Subtitle',
        content: 'Found Content',
        vettedDate: new Date()
      });
    }
    return null;
  });

  KnowledgeItem.prototype.setTags = jest.fn().mockResolvedValue(true);

  const Tag = dbMock.define('Tag', {
    tag_id: 1,
    tag: 'Test Tag'
  });

  const VersionHistory = dbMock.define('VersionHistory', {
    KnowledgeItem_id: 1,
    content: 'Old content',
    updatedAt: new Date()
  });

  return {
    KnowledgeItem,
    Tag,
    VersionHistory,
    sequelize: dbMock
  };
});

const knowledgeService = new KnowledgeService();

describe('KnowledgeService - create', () => {
  it('should create a knowledge item and set tags', async () => {
    const data = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      vettedDate: '2022-04-03',
      content: 'Test Content',
      tags: ['Test Tag']
    };
    const result = await knowledgeService.create(data);
    expect(result).toHaveProperty('title', 'Test Title');
    expect(result.setTags).toHaveBeenCalled();
  });
});


describe('KnowledgeService - getAll', () => {
  it('should return all knowledge items', async () => {
    const rsult = await knowledgeService.getAll();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('KnowledgeService - update', () => {
  it('should return null if item is not found', async () => {
    const result = await knowledgeService.update(999, {
      title: 'Updated'
    });
    expect(result).toBeNull();
  });

  it('should update an item if found', async () => {
    const result = await knowledgeService.update(1, {
      title: 'Updated Title',
      subtitle: 'Updated Subtitle'
    });
    expect(result).toHaveProperty('title', 'Updated Title');
  });
});

describe('KnowledgeService - delete', () => {
  it('should delete item if found', async () => {
    const result = await knowledgeService.delete(1);
    expect(result).toHaveProperty('title', 'Test Title');
  });

  it('should return null if item is not found', async () => {
    const result = await knowledgeService.delete(999);
    expect(result).toBeNull();
  });
});

describe('KnowledgeService - findByTag', () => {
  it('should return items with tag', async () => {
    const result = await knowledgeService.findByTag('Test Tag');
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('KnowledgeService - findByTitle', () => {
  it('should return items with matching title', async () => {
    const result = await knowledgeService.findByTitle('Test');
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('KnowledgeService - findBySubtitle', () => {
  it('should return items with matching subtitle', async () => {
    const result = await knowledgeService.findBySubtitle('Test');
    expect(Array.isArray(result)).toBe(true);
  });
});
