# FYK!
This was a silly little project intended to emulate some similar blogs on Tumblr, but was mostly intended to serve as practice for asynchronous programming.  Feel free to mess around with it, or post an issue.  If you're here from Tumblr, please don't ban me!

It will mirror all postings of Koishi Komeiji on Danbooru.  I have not put any kind of work safe restrictions in place so browse at your own peril! (... however if there is interest, or this starts spewing anything too explicit, I will).

My direction here has been to build something that can run eternally on Heroku without ever requiring anyone to pay a dime - To this end, this makes use of Heroku's wonderful free-tier dyno which lets us run code for 18hrs every day, this also requires the use of Heroku's scheduler plugin (which runs this "every ten minutes"), and Heroku's free Redis plugin (to store the real last run time, so we don't accidentally skip or duplicate posts).

Copyright (c) 2016, Alex Wilson <a@ax.gy>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


