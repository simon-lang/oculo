# Oculo

This component is accessible at [https://simon-lang.github.io/oculo/](https://simon-lang.github.io/oculo/)

If you wish to run it yourself, please clone this repository, `npm install` and `npm start`

## Choice of technology

Create React App was used to bootstrap the project and start with sensible webpack configuration.

Typescript was chosen because even when not being used to its full potential, the type checking, code completion (even in vim!) are invaluable.

Prettier is used to auto format code.

Bootstrap was used mostly to provide a grid layout that works well at all screen sizes.

Create React App comes with testing-library and jest, which allows for the creation of some basic unit tests which check the core functionality works as expected.

Github Pages used for free static hosting.

## Approach

The supplied sample data was already grouped by date. Since we want to allow the user to choose the field to group by, the first step was to flatten the data into an array. It made sense to just do this once. See `flatten.ts`.

Now we are working with a simple array, we allow the user to select a field, and use lodash's `groupBy` function to group them.

For each group we render a heading and a list of cards. Each card contains the image and its associated metadata.

## Extra functionality

The provided requirements only asked for extremely basic functionality. i.e.

> We would like you to create a view showing the images and associated meta data which has a toggle that enables the Optometrist to group images by modality or examination date.

Once the core functionaity was implemented, I added a few minor additional features. Here is the rationale for each:

### Responsive design

Not knowing what the typical user's screen sizes are, I ensured it works reasonably well from mobile up to large 4k displays.

### Group by eye

Since the groupBy functionality is indifferent to exactly what field it is grouping on, it made sense to just add one extra field to group by. In practice I understand this may be of no interest to real users but I feel it helps to highlight the implementation.

### Filtering

Obviously a full solution for something like this would probably support faceting and multiple filters on multmultiple fields. However like the eye grouping above, since it was trivial to support filtering the current group's values, I thought it might slightly improve the UX.

### Click to view fullscreen image

It feels strange to have a list of items that can not be inspected in more detail. In the case on images, it's almost guaranteed the user would want to inspect them in more detail. So I added a very basic fullscreen class that expands the image to fill the users screen. Press escape or click again to exit.

### Unit tests

Feel free to run the handful of unit tests with `npm test`

### Accessibility

Not a large effort was put into ensuring accessibility, but I thought given the domain, at least some basic ARIA roles should be added to allow visually impaired users better access.

### Labelling dates

Basic date parsing and formatting was applied. Obviously this might not be the desired format (personally I love ISO 8601) but I figured it looks slightly nicer.

## Other notes

The top level component is called App. Obviously if this component were to be part of a larger application it would be renamed to GroupedImageList or something more domain specific.

No routing was added. It might make sense to persist the group/filter or fullscreen choices in the URL and support browser navigation, but was left out for now.

The visual design is actually the part I am least happy with. In particular the nested "card within cards" to show the groupings doesn't look great. I would like to think that in an existing app there would be a design system or precedent for layouts like this.

If you have any comments or feedback, please don't hesitate to get in touch.
