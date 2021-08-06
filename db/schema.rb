# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_06_093945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "concessions", force: :cascade do |t|
    t.integer "reception_id"
    t.string "name"
    t.string "cost"
    t.integer "amount"
    t.integer "total_cost"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "decorations", force: :cascade do |t|
    t.integer "reception_id"
    t.string "name"
    t.integer "cost"
    t.integer "amount"
    t.integer "total_cost"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.integer "total_budget"
    t.integer "available_budget"
    t.integer "venue_capacity"
    t.integer "head_count"
    t.string "location"
    t.date "date"
    t.time "time"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "guest_lists", force: :cascade do |t|
    t.integer "event_id"
    t.integer "invited"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "guests", force: :cascade do |t|
    t.string "name"
    t.integer "guest_list_id"
    t.boolean "plus_one"
    t.boolean "invited"
    t.boolean "bridesmaid"
    t.boolean "groomsmen"
    t.boolean "bridge"
    t.boolean "groom"
    t.boolean "family"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "receptions", force: :cascade do |t|
    t.string "time"
    t.integer "total_cost"
    t.integer "event_id"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
