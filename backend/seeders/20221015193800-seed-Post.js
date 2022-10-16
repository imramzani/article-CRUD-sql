'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Posts', [{
        title: "Growing out Plant",
        content: `Gardening may be a fun and relaxing way to get in touch with nature, but did you know that it also has plenty of health benefits? Gardening is an activity that’s good for both the mind and body, and can be enjoyed by people of all ages. Plus, you get to eat the delicious fruits, vegetables and herbs that you grow. So, grab your tools and get in the dirt!        It only takes a little bit of gardening to work up a sweat. According to the Centers for Disease Control and Prevention, just 2.5 hours of moderate activity each week can help reduce the risk of many health problems, including heart disease, stroke, high blood pressure and Type 2 diabetes.
        
        You may not think of gardening as exercise, but all the lifting, shoveling and raking involved definitely counts, says Raychel Santo, MA, senior research program coordinator for the Center for a Livable Future at the Johns Hopkins Bloomberg School of Public Health.
        
        Your brain also benefits from time spent in the garden. Being outside in the fresh air and sunshine is an effective way to boost your mood and de-stress. In fact, gardening has shown to be helpful in reducing the risk of depression. If something is weighing heavily on your mind, gardening can allow you to focus on an activity that will bring you joy.`,
        category: "gardening",
        created_date: new Date(),
        updated_date: new Date(),
        status: "Publish",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {})
  }
};
