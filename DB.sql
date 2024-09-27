-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

-- -----------------------------------------------------
-- Table `mydb`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`courses`;

CREATE TABLE IF NOT EXISTS `mydb`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `course_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`students`;

CREATE TABLE IF NOT EXISTS `mydb`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `matricula` INT NOT NULL,
  `courses_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_students_courses`
    FOREIGN KEY (`courses_id`)
    REFERENCES `mydb`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`events`;

CREATE TABLE IF NOT EXISTS `mydb`.`events` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`roles`;

CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `roles` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`atribuitions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`atribuitions`;

CREATE TABLE IF NOT EXISTS `mydb`.`atribuitions` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_atribuitions_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `mydb`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`meals_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`meals_type`;

CREATE TABLE IF NOT EXISTS `mydb`.`meals_type` (
  `id` INT NOT NULL AUTO_INCREMENT,  -- Adicionado AUTO_INCREMENT
  `meal_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`students_has_atribuitions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`students_has_atribuitions`;

CREATE TABLE IF NOT EXISTS `mydb`.`students_has_atribuitions` (
  `students_id` INT NOT NULL,
  `atribuitions_id` INT NOT NULL,
  `events_id` INT NOT NULL,
  PRIMARY KEY (`students_id`, `atribuitions_id`),
  CONSTRAINT `fk_students_has_atribuitions_students1`
    FOREIGN KEY (`students_id`)
    REFERENCES `mydb`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_has_atribuitions_atribuitions1`
    FOREIGN KEY (`atribuitions_id`)
    REFERENCES `mydb`.`atribuitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_has_atribuitions_events1`
    FOREIGN KEY (`events_id`)
    REFERENCES `mydb`.`events` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`meals_type_has_atribuitions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`meals_type_has_atribuitions`;

CREATE TABLE IF NOT EXISTS `mydb`.`meals_type_has_atribuitions` (
  `meals_type_id` INT NOT NULL,
  `atribuitions_id` INT NOT NULL,
  PRIMARY KEY (`meals_type_id`, `atribuitions_id`),
  CONSTRAINT `fk_meals_type_has_atribuitions_meals_type1`
    FOREIGN KEY (`meals_type_id`)
    REFERENCES `mydb`.`meals_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meals_type_has_atribuitions_atribuitions1`
    FOREIGN KEY (`atribuitions_id`)
    REFERENCES `mydb`.`atribuitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
