
// Hva er et API?
// => Application Programming Interface
// => Programmeringsgrensesnitt

// Vårt program/app/nettside => API => Server => DB => ...

// RESTful - API-er som på en eller flere måter etterlever egenskaper og begrensninger 
//           bruker vanligvis JSON eller XML for meldinger, men kan bruke et vilkårlig format.
// SOAP - *Simple Object Access Protocol Application Programming Interface* - XML for meldinger, typisk sett ifm. eldre tjenester.
// GraphQL - Data IO, integrasjoner, automatiseringer, m.m.
// gRPC - Google's protobuf-baserte RPC protokoll. *Forenklet*: Gjør det mulig å kjøre funksjoner på hos en ekstern tjeneste.

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// 1. Tilkobling
// 2. Tilgang
// 3. Kjenne til spec., dvs. beskrivelse av endepunkter
// ... => DB

////// HTTP Request - Metoder - HTTP Verb
// Metode:    Beskrivelse:
// GET      - Hent info
// POST     - Opprett, KUN OPPRETT)
// PUT      - Opprett, hvis element ikke eksisterer; hvis det eksisterer, oppdater)
//            Oppretter/oppdaterer -> Upsert -> Insert/Update
// PATCH    - Oppdaterer, KUN OPPDATERING
// DELETE   - Sletter info

// GET    /v1/users        -> User[]
// GET    /v1/users/:id    -> User ved ID
// POST   /v1/users        -> Oppretter vi en User
// DELETE /v1/users/:id    -> Slette en User ved ID

// Anatomien av et RESTful API

// https://[server-ip/domain](:[port])/(v1 | api/v1 | api)/[collection]/[id/unikt-felt]
// [METODE] https://[server-og-endepunkt] -> `any`

// https://[server-ip/domain]/v1/docs

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


//////////////////////////////////////
// JSON - Javascript Object Notation

// Javascript                     JSON
const obj = {                  // {           
    id: "abcd-1234-...",       //     "id": "abcd-1234-...",
    name: {                    //     "name": {             
        first: "Foo",          //         "first": "Foo",   
        last: "Bar",           //         "last": "Bar"    
    },                         //     },                  
    age: 19,                   //     "age": 19,            
}                              // }                       




///////////////////////////////////////////////////////
// Eksempel - POST, hent ut `id`, GET basert på `id`:

let id = null;

const POST = async () => {
    console.log("POST - Running...");

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
         title: "foo",
         body: "bar",
         userId: 1,
      }),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
      },
   });

   if (!response.ok) {
      throw new Error(response.statusText);
   }

   const json = await response.json();
   console.log(response);
   console.log(json);

   id = json.id - 100;
   console.log("POST - Finished...");
};


const GET = async () => {
    console.log("GET - Running...");
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/postss/${id}`
   );
   console.log(id);

   if (!response.ok) {
    throw new Error(response.statusText);
   }

   console.log(response);
   console.log(await response.json());

   console.log("GET - Finished... ");
};


// Wrapped async
(async () => {
   try {
      await POST();
      await GET();
   } catch (err) {
      console.error("Got an error", err);
   } finally {
      console.log("finished");
   }
})();