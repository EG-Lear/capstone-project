# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(username: 'TestUser', password: 'testing12')
Event.create(name: 'test build', total_budget: 2000, user_id: user.id)

User.create(username: 'RegUser', password: 'testing12')