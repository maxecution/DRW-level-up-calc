# Level Up Calculator

The **Level Up Calculator** helps users calculate how long it will take to level up in a role-playing game (RPG) based on available XP and the current and desired levels. It also allows for the calculation of level-up dates while considering the cooldown period between level-ups.

## Features

- **Level Calculation**: Calculate the required XP and estimated dates for each level-up.
- **Dynamic Date Adjustments**: Adjusts the calculation based on the last leveled date, adding a cooldown period if necessary.
- **Input Validation**: Ensures the current level, desired level, XP, and last leveled date are valid before calculation.

## Project Structure

- **HTML**: The structure of the user interface.
- **CSS**: Styled using Tailwind CSS for responsive and modern design.
- **JavaScript**: Handles the functionality of the form, including form validation and the level-up calculation logic.

## Installation

1. Clone this repository or download the project files.
2. Open `index.html` in your preferred browser to use the Level Up Calculator.

Alternatively, you can access the project directly [here](https://maxecution.github.io/DRW-level-up-calc/).

## Usage

### 1. Enter the **Current Level**:

- The current level should be a number between 3 and 19.

### 2. Enter the **Desired Level**:

- The desired level should be a number between 4 and 20, and it must be higher than the current level.

### 3. Enter the **Available XP**:

- Enter the amount of XP you currently have available (between 0 and 999, assumed to be 0 if left blank).

### 4. Enter the **Last Level Up Date**:

- Enter the last date on which your character leveled up, the date must be in the past (if left blank it is assumed the last level up happened more than 7 days ago).

### 5. Click **Calculate** to get the estimated level-up dates.

### 6. Click **Clear** to reset the form.

## Example

1. **Current Level**: 5
2. **Desired Level**: 10
3. **Available XP**: 50
4. **Last Level Up Date**: 2024-10-01

The calculator will show the dates on which you will reach each level from your current level to your desired level, assuming you spend all XP on this character.

## Script Explanation

The JavaScript code attached to this project handles the following:

- **Form Validation**: Ensures that user inputs are valid and display error messages if necessary.
- **XP Calculation**: Calculates the total XP required for leveling up between the current level and the desired level.
- **Level-up Dates**: Computes the dates for each level-up, considering cooldowns based on the last leveled date.

## Contribution

Feel free to fork this repository and make improvements! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to your forked repository (`git push origin feature-branch`).
5. Open a pull request with a description of your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).
