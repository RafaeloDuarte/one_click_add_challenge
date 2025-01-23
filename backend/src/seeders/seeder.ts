import { sequelize } from "../database";
import { User } from "../models/User";
import { Video } from "../models/Video";

const seedDatabase = async () => {
  await sequelize.sync();

  const existingUser = await User.findOne({ where: { email: 'alice@example.com' } });
  if (!existingUser) {
    await User.create({
      username: "admin",
      password: "1234",
      email: 'alice@example.com',
      isAdmin: true
    });
  }

  const existingBob = await User.findOne({ where: { email: 'bob@example.com' } });
  if (!existingBob) {
    await User.create({
      username: "user",
      password: "user",
      email: "bob@example.com",
      isAdmin: false
    });
  }

  const existingTestVideo = await Video.findOne({ where: { title: 'Test Video' } });
  if (!existingTestVideo) {
    await Video.create({
      votes: 0,
      title: "[NCDP] O PERDÃO - Luciano Subirá ",
      url: "https://www.youtube.com/watch?v=KArB7uCbaGc"
    });
  }

  const existingAnotherTestVideo = await Video.findOne({ where: { title: 'Another Video' } });
  if (!existingAnotherTestVideo) {
    await Video.create({
      votes: 5,
      title: "Como sabemos as cores dos dinossauros?",
      url: "https://www.youtube.com/watch?v=lzindk3Z2Bg"
    });
  }
  console.log("Dados de exemplo criados ou encontrados!");
};

seedDatabase();
