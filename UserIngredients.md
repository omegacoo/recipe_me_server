**User Ingredients**
----
> Fetches the ingredients the user has stored in their pantry and also allows the user to update that pantry

* **URL**

    /api/user_ingredients

* **Methods**

    `GET` <br />
    `POST`

* **Data Params**

    **Required:**

    `user_id=[int]` <br />
    `token=[JWT]`

* **Success Response**

    * **Code:** 200 <br />
      **Content:** List of ingredients <br />

    * **Code:** 201

* **Error Response**

    * **Code:** 401

    * **Code:** 400

* **Sample Call**

    ```
    fetch(
        '/api/user_ingredients', 
        {
            method: 'GET',
            headers: {
                "Cookies": token,
                "user_id": //your user ID
            }
        }
    );
    ```

    ```
    fetch(
        '/api/user_ingredients',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "user_id": //your user ID,
                "Cookies": token
            },
            body: {
                JSON.stringify([//list of ingredients])
            }
        }
    )
    ```