**Available Recipes**
----
> Asks the server what recipes can be made given the user's stored ingredients

* **URL**

    /api/available_recipes

* **Method**

    `GET`

* **Data Params**

    **Required:**

    `user_id:[int]` <br />
    `token:[JWT]`

* **Success Response**

    * **Code:** 200 <br />
      **Content:** List of recipes

    * **Code:** 201

* **Error Response**

    * **Code:** 401

    * **Code:** 400

* **Sample Call**

    ```
    fetch(
        '/api/available_recipes', 
        {
            method: 'GET',
            headers: {
                "Cookies": token,
                "user_id": //your user ID
            }
        }
    );
    ```