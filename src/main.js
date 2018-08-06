
    /* 
     * Title
     * 
     * Page title scrolling and flashing class
     * @para object options the options for the class
     */
    function Title(options = {}){

        var self = this;
        this.options = options;

        /* 0 = original, 1 = new title */
        this.currentState = 0;

        this.states = {
            original: document.getElementsByTagName("title")[0].textContent,
            new: "",
        };

        this.toggle = function(){
            if(self.currentState === 0){
                document.title = self.states.new;
                self.currentState = 1;
            }else{
                document.title = self.states.original;
                self.currentState = 0;
            }
        }


        /* flash
         * 
         * start a flashing title action
         * 
         * @param {string} newTitle The title to scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         * */
        this.flash = function(newTitle, duration = 10000){
            if(typeof self.scrollInterval === "undefined" && typeof self.toggleInterval === "undefined"){

                self.states.new = newTitle;

                var i = 0;
                var speed = (typeof this.options.flashSpeed === "undefined" ? 1000 : this.options.flashSpeed);

                self.toggleInterval = setInterval(function(){
                   self.toggle();
                   i += speed;
                   if(i >= duration){
                        /* stop timer */
                        clearInterval(self.toggleInterval);

                        /* put page back to original state */
                        document.title = self.states.original;
                   }
                }, speed);
            }
        }

        /* scroll
         * 
         * @param {string} newTitle The title to scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         *   */
        this.scroll = function(newTitle, duration = 10000){
            if(typeof newTitle !== "undefined"){
                /* no new title set for scroll use existing */
                if(typeof self.toggleInterval === "undefined" && typeof self.scrollInterval === "undefined"){
                    /* no flash running */
                    self.doScroll(newTitle);
                }
            }else{
                /* use current title */
                if(typeof self.toggleInterval === "undefined" && typeof self.scrollInterval === "undefined"){
                    /* no flash running */
                    self.doScroll(document.title = self.states.original);
                }
            }
        }

        /* doScroll
         * 
         * @param {string} text The Text To Scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         * */
        this.doScroll = function(text, duration = 10000) {
            document.title = text;
            var i = 0;
            var speed = (typeof this.options.scrollSpeed === "undefined" ? 1000 : this.options.scrollSpeed);
            var position = 0;
            self.scrollInterval = setInterval(function () {
                document.title = text.substr(position) + text.substr(0, position);

                position += 1;

                if(position >= text.length){
                    position = 0;
                }

                i += speed;

                if(i >= duration){
                    clearInterval(self.scrollInterval);

                    /* put page back to original state */
                    document.title = self.states.original;
                }
            }, speed);
        }
    }



    
