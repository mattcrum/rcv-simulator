# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ballots = Ballot.create([
  { first_choice: 3, second_choice: 2, third_choice: 1 },
  { first_choice: 1, second_choice: 4, third_choice: 2 },
  { first_choice: 3, second_choice: 2, third_choice: 4 },
  { first_choice: 4, second_choice: 3, third_choice: 2 },
  { first_choice: 1, second_choice: 3, third_choice: 2 },
  { first_choice: 1, second_choice: 2, third_choice: 4 },
  { first_choice: 3, second_choice: 2, third_choice: 4 },
  { first_choice: 2, second_choice: 3, third_choice: 4 },
  { first_choice: 3, second_choice: 1, third_choice: 2 },
  { first_choice: 4, second_choice: 3, third_choice: 1 },
  { first_choice: 1, second_choice: 2, third_choice: 4 },
  { first_choice: 2, second_choice: 3, third_choice: 1 },
  { first_choice: 2, second_choice: 1, third_choice: 4 },
  { first_choice: 1, second_choice: 3, third_choice: 2 },
  { first_choice: 1, second_choice: 3, third_choice: 2 },
  { first_choice: 3, second_choice: 1, third_choice: 2 },
])
