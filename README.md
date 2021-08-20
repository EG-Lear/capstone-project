# README

## Installation

To use this fork and clone the repository from github
run 
bundle install
rails db:create
rails db:migrate
rails db:seed
npm install --prefix client

## About

This is a basic app for managing information related to a wedding, It allows you to plan the wedding itself, reception, guest-list, and expenses that you can be involved.

The back-end keeps track of information that is relevant across models namely the total cost of everything being planned. It also will keep track of the headcount of invited guests if you have a max capacity that doesn't accomidate your entire friend and family group.

## Security

It uses has_secure_password from ActiveRecord and BCrypt to secure passwords on the backend

## Lisence

[MIT](https://choosealicense.com/licenses/mit/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



