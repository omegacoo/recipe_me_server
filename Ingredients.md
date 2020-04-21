**Ingredients**
----
> Get all ingredients from the database

* **URL**

    /api/ingredients

* **Method**

    `GET`

* **Success Response**

    * **Code:** 200
      **Content:** List of available ingredients

* **Sample Call**

    ```
    fetch(
        '/api/ingredients', 
        {
            method: 'GET'
        }
    );
    ```