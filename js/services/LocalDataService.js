(function() {
    'use strict';
    angular.module('myApp.services', ['LocalStorageModule']);
    angular.module('myApp.services').factory('LocalDataService', LocalDataService);
    /**
     * @ngdoc service
     * @name LocalDataService
     * @description Handles storing and retrieving data for the app,
     * ``` uses both localStorage and backup JSON files ```
     * @class
     * @param localStorageService
     * @returns {LocalDataService}
     * @constructor
     */
function LocalDataService(localStorageService) {

    this.localStorageService = localStorageService;
    /**
     * Bootstrap data load.
     * @optional globalData Pass in backup data for fallback
     * @returns {{videos, compics}}
     */
    this.startup = function(globalData)
    {
        var videos = this.loadData({name: "videos"}), compics = this.loadData({name: "compics"});

        //If there is a problem with the local data get the backup data
        if(!videos || !compics)
        {
            console.log("localStorage data invalid, falling back to backup data.")
            videos = globalData.videos;
            compics = globalData.compics;
            this.saveData({name: "videos", data: videos});
            this.saveData({name: "compics", data: compics});
        }

            return {
                videos: videos,
                compics: compics
            };

        };


        /**
         * Retrieves data from localStorage
         * @name loadData
         * @function
         * @param {{name: string}} options
         * @returns {json}
         */
        this.getLocalData = function(options) {
            //Check name
            if(options !== Object(options)) {
                console.error("This function only accepts a single parameter as an options object.");
                return false;
            }
            var name = options.name;

            var result = this.localStorageService.get(name);
                if(result !== null) {
                    //angular-local-storage returns a null object if not found.
                    return result;
                }

            console.warn("Local storage object " + name + " does not exist");
            return false;


        };

        /**
         * @memberof LocalDataService
         * @name saveData
         * @function
         * @param {{name: string, data: Object}} options
         *
         * @returns {Function}
         *
         */
       this.setLocalData = function(options) {

                //Check name
                if (options !== Object(options)) {
                    console.error("This function only accepts a single parameter as an options object.");
                    console.log(options);
                    return false;
                }

                /* The key to use on the localStorage object */
                var name = options.name;
                var data = options.data;

                //Store in localStorage
                try {
                    this.localStorageService.set(name, data);
                    return data;
                } catch (e) {
                    console.log("Error saving to localStorage. " + e.message);
                    console.log(obj);
                    console.log(data);
                    return false;
                }


            };


            this.saveData = function(options)
            {
                return this.setLocalData(options);
            };

            this.loadData = function(options)
            {
                return this.getLocalData(options);
            };

            this.$inject = ['localStorageService'];

    return this;

    }




})();




