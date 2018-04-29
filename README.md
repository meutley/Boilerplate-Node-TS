# Boilerplate Node / TypeScript

This project was initially created as an experiement with TypeScript and node.js. It has grown beyond the original plan, and development will continue whenever I feel up to it. I come from a .Net background, including ASP .NET MVC, and that is where a lot of the inspiration comes from. If you are familiar with ASP .NET MVC, you will probably see the similarities.

## Key Dependencies

* Express
* JSONWebToken
* BCryptJS
* Mocha / Chai / Sinon / Supertest
* Lodash
* Copyfiles

## My Favorite Features (in no particular order)

* MVC-ish controller / view system, wired up by convention
* The ability to quickly add controllers and views, as well as API routes
* Per-environment configuration

## Proud Moments (in no particular order)

* Successfully implemented the by-convention, dynamic MVC-ish controller / view system
* Finally dabbling in unit testing node.js applications, including testing routes / API endpoints
* Created abstractions around things like "console.log" and response handling in order to make common code more readable / easier to write

## Getting Started

It's simple: run `npm install`, then `npm run watch-dev`. Point your browser to http://localhost:3000/ and you're good to go!

To run the unit tests: `npm run test`. BAM!

## Running in a Docker container

1. Build the container: `./docker/build-container.sh`
2. Rename `./docker/run-docker.sample.sh` to `run-docker.sh` and change `-e` environment parameters accordingly
3. Run the container: `./docker/run-docker.sh`
   * You can use the `-e` flag to pass in the appropriate environment variables: `ENVIRONMENT_NAME`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`, `DB_URL`, and `DB_USERNAME`
   * See `run-docker.sh` for a shell script example
4. To stop (if it's running), (re-)build, then start the container: `./docker/build-and-run.sh`

**Note**: You will also need to allow the shell scripts to be executed: `chmod +x ./docker/*.sh`

**Note**: The `ENVIRONMENT_NAME` environment variable can be one of the following: `Local, Debug, QA, Production`

## Adding An MVC Style Controller / View

1. Create a `{name}.controller.ts` file in `src/web/controllers`
2. Create the class, which should extend the `BaseController` type (follow the `HomeController` in `src/web/controllers/home` if necessary)
3. In `src/web/controllers/index.ts` add a line inside the `configure` export to register the new controller
   * Action methods are named with the HTTP verb followed by the action name (e.g. `GET /index` = `YourController.getIndex`)
4. Create a folder in `src/web/views` which matches the name of the new controller (e.g. _**Home**_Controller -> views/_**home**_)
5. If your controller action renders a view, create the .ejs file with the action name in the new views folder

## Adding An API Route

1. Create a `router.ts` file in `src/web/api/{API Name}`
2. Instantiate a new `RouteConfig` object and implement the desired route handlers (follow the `router.ts` in `src/web/api/test` if necessary)
3. Import the new router with an alias in `src/web/api/index.ts`, then add it to the exported `Routers` array
4. Start the server and hit your endpoint; it should already be available