<template>
  <div :class="pageStatus" class="animated fadeIn">
    <div>
      <b-button-group v-if="user.is_superuser" size="sm">
        <b-button
          ref="cancelitem-button"
          variant="secondary"
          @click="cancelEdit"
          class="float-left"
          >Cancel
        </b-button>
        <b-button
          :disabled="!itemValid"
          type="submit"
          variant="primary"
          @click="saveItem()"
          >Save
        </b-button>
      </b-button-group>
      <b-button-group v-if="!user.is_superuser" size="sm">
        <b-button
          ref="cancelitem-button"
          variant="secondary"
          @click="cancelEdit"
          class="float-left"
          >Back to {{ this.pluralName }}
        </b-button>
      </b-button-group>
    </div>

    <!-- editor for admins -->

    <b-form-group class="item-form-input">
      <div v-if="user.is_superuser">
        <label v-if="this.singularName != 'Person'" for="item-name">Name</label>
        <i
          v-if="this.singularName != 'Person'"
          class="fa fa-asterisk required"
        ></i>
      </div>
      <b-input-group v-if="this.singularName != 'Person'">
        <b-form-input
          id="item-name"
          type="text"
          v-model="name"
          :autofocus="true"
          @input="validateItem"
        />
        <b-form-invalid-feedback id="item-name-validation"
          >Enter at least 4 characters
        </b-form-invalid-feedback>
      </b-input-group>

      <b-card
        no-body
        class="item-form-input"
        v-if="this.singularName == 'Person'"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            v-if="name"
            block
            href="#"
            v-b-toggle.name-box
            variant="link"
            size="md"
            class="text-left"
            >{{ name }}</b-button
          >
          <b-button
            v-else
            block
            href="#"
            v-b-toggle.name-box
            variant="link"
            size="md"
            class="text-left"
            >Name</b-button
          >
        </b-card-header>
        <b-collapse id="name-box" accordion="name-box" role="tabpanel">
          <b-card-body>
            <label for="item-name-suffix">Prefix</label>
            <b-input-group>
              <b-form-input
                id="item-name-suffix"
                type="text"
                v-model="name_suffix"
                :autofocus="true"
                @input="validateItem"
              />
            </b-input-group>

            <label for="item-name-first">First Name</label>
            <b-input-group>
              <i class="fa fa-asterisk required"></i>
              <b-form-input
                id="item-name-first"
                type="text"
                v-model="name_first"
                :autofocus="true"
                @input="validateItem"
              />
            </b-input-group>

            <label for="item-name-middle">Middle Name</label>
            <b-input-group>
              <b-form-input
                id="item-name-middle"
                type="text"
                v-model="name_middle"
                :autofocus="true"
                @input="validateItem"
              />
            </b-input-group>

            <label for="item-name-last">Last Name</label>
            <b-input-group>
              <i class="fa fa-asterisk required"></i>
              <b-form-input
                id="item-name-first"
                type="text"
                v-model="name_last"
                :autofocus="true"
                @input="validateItem"
              />
            </b-input-group>

            <label for="item-name-first">Suffix</label>
            <b-input-group>
              <b-form-input
                id="item-name-suffix"
                type="text"
                v-model="name_suffix"
                :autofocus="true"
                @input="validateItem"
              />
            </b-input-group>
          </b-card-body>
        </b-collapse>
      </b-card>

      <label class="item-form-input" for="item-description">Description</label>
      <b-input-group>
        <b-form-input
          id="item-description"
          maxlength="256"
          type="text"
          v-model="description"
          @input="validateItem"
        />
        <b-form-invalid-feedback id="item-name-description"
          >Enter less than 256 characters
        </b-form-invalid-feedback>
      </b-input-group>

      <div class="item-form-input">
        <label for="item-url">Website&nbsp;</label>
        <b-link v-if="url" :href="url" target="_blank">
          <i class="fa fa-external-link"></i>
        </b-link>
      </div>
      <b-input-group>
        <b-form-input
          id="item-website"
          type="text"
          v-model="url"
          @input="validateItem"
        />
      </b-input-group>

      <!-- Read-Me form -->
      <b-card class="item-form-input" no-body>
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            href="#"
            v-b-toggle.read-me
            variant="link"
            size="md"
            class="text-left"
            >Read Me</b-button
          >
        </b-card-header>
        <b-collapse id="read-me" accordion="read-me" role="tabpanel">
          <b-card-body>
            <b-input-group>
              <b-form-textarea
                id="item-read-me"
                v-model="read_me"
                placeholder
                type="text"
                rows="8"
                size="sm"
                @input="updateMarkdown"
              >
              </b-form-textarea>
            </b-input-group>

            <b-button
              block
              href="#"
              v-b-toggle.readme-preview
              variant="link"
              size="sm"
              class="text-left"
              >Preview</b-button
            >
            <b-collapse id="readme-preview">
              <div id="compiled-markdown" v-html="compiledMarkdown"></div>
            </b-collapse>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- Additional Details -->
      <b-card no-body v-if="showAdditionalDetails">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            href="#"
            v-b-toggle.additional-details
            variant="link"
            size="md"
            class="text-left"
            >Additional Details</b-button
          >
        </b-card-header>
        <b-collapse
          id="additional-details"
          accordion="additional-details"
          role="tabpanel"
        >
          <b-card-body>
            <b-input-group v-if="showGames">
              <label for="item-games">Games</label>
              <v-select
                class="item-form-input"
                v-model="games"
                :options="gameOptions"
                :reduce="gameOptions => gameOptions.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>
            <b-input-group v-if="showGame">
              <label for="item-games">Game</label>
              <v-select
                class="item-form-input"
                v-model="game"
                :options="gameOptions"
                :reduce="gameOptions => gameOptions.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <!-- Format Type -->
            <b-input-group v-if="this.singularName == 'BookFormat'">
              <label for="item-format-type">Format Type</label>
              <v-select
                class="item-form-input"
                v-model="format_type"
                :options="formatTypes"
                :reduce="formatTypes => formatTypes.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <!-- Publisher -->
            <b-input-group
              v-if="
                this.singularName != 'Publisher' &&
                  this.singularName != 'BookFormat' &&
                  this.singularName != 'Workflow'
              "
            >
              <label for="item-publisher">Publisher</label>
              <v-select
                class="item-form-input"
                v-model="publisher"
                :options="publishers"
                :reduce="publishers => publishers.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <!-- Game System -->
            <b-input-group v-if="this.singularName == 'Game'">
              <label for="item-format">Game System:</label>
              <v-select
                class="item-form-input"
                v-model="game_system"
                :options="gameSystems"
                :reduce="gameSystems => gameSystems.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <!-- Book Format -->
            <b-input-group v-if="this.singularName == 'Book'">
              <label for="item-format">Book Format:</label>
              <v-select
                class="item-form-input"
                v-model="book_format"
                :options="bookFormats"
                :reduce="bookFormats => bookFormats.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <!-- Short Name -->
            <div
              v-if="
                this.singularName != 'Publisher' &&
                  this.singularName != 'BookFormat' &&
                  this.singularName != 'Workflow'
              "
            >
              <label for="item-short-name">Short Name</label>
              <b-input-group>
                <b-form-input
                  id="item-short-name"
                  type="text"
                  v-model="short_name"
                  @input="validateItem"
                />
              </b-input-group>
            </div>

            <!-- Abbreviation -->
            <div
              v-if="
                this.singularName != 'BookFormat' &&
                  this.singularName != 'Workflow'
              "
            >
              <label for="item-abbreviation">Abbreviation</label>
              <b-input-group>
                <b-form-input
                  id="item-abbreviation"
                  type="text"
                  v-model="abbreviation"
                  @input="validateItem"
                />
              </b-input-group>
            </div>

            <!-- Book Specific -->
            <div v-if="this.singularName == 'Book'">
              <label for="item-catalog-number">Catalog Number</label>
              <b-input-group>
                <b-form-input
                  id="item-catalog-number"
                  type="text"
                  v-model="catalog_number"
                  @input="validateItem"
                />
              </b-input-group>

              <label for="item-publication-year">Publication Year</label>
              <b-input-group>
                <b-form-input
                  id="item-publication-year"
                  type="number"
                  v-model="publication_year"
                  @input="validateItem"
                />
              </b-input-group>

              <label for="item-pages">Pages</label>
              <b-input-group>
                <b-form-input
                  id="item-pages"
                  type="number"
                  v-model="pages"
                  @input="validateItem"
                />
              </b-input-group>

              <label for="item-isbn-10">ISBN-10&nbsp;</label>
              <b-link
                v-if="isbn_10"
                :href="`https://isbnsearch.org/isbn/${isbn_10}`"
                target="_blank"
                title="ISBN-10 lookup"
              >
                <i class="fa fa-external-link"></i>
              </b-link>
              <b-input-group>
                <b-form-input
                  id="item-isbn-10"
                  type="text"
                  v-model="isbn_10"
                  pattern="^(?:ISBN(?:10)?(?:-10)?\x20)?[0-9]{9}(\d|X)$"
                  @input="validateItem"
                />
                <b-form-invalid-feedback id="item-isbn-10-validation"
                  >Enter a valid ISDN-10 value
                </b-form-invalid-feedback>
              </b-input-group>

              <label for="item-isbn-13">ISBN-13&nbsp;</label>
              <b-link
                v-if="isbn_13"
                :href="`https://isbnsearch.org/isbn/${isbn_13}`"
                target="_blank"
                title="ISBN-13 lookup"
              >
                <i class="fa fa-external-link"></i>
              </b-link>
              <b-input-group>
                <b-form-input
                  id="item-isbn-13"
                  type="text"
                  v-model="isbn_13"
                  pattern="^(?:ISBN(?:13)?(?:-13)?\x20)?:?97(?:8|9)[0-9]{10}$"
                  @input="validateItem"
                />
                <b-form-invalid-feedback id="item-isbn-13-validation"
                  >Enter a valid ISDN-13 value
                </b-form-invalid-feedback>
              </b-input-group>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- Workflow Details -->
      <b-card no-body v-if="this.itemsState == 'workflows'">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            href="#"
            v-b-toggle.workflow-details
            variant="link"
            size="md"
            class="text-left"
            >Wofkflow Details</b-button
          >
        </b-card-header>
        <b-collapse
          id="workflow-details"
          accordion="workflow-details"
          role="tabpanel"
        >
          <b-card-body>
            <!-- Workflow Method -->
            <b-input-group>
              <label for="item-format-type">Workflow Method</label>
              <v-select
                class="item-form-input"
                v-model="workflow_method"
                :options="workflowMethods"
                :reduce="workflowMethods => workflowMethods.value"
                label="text"
                :multiple="false"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>
            <b-input-group>
              <b-form-checkbox v-model="enabled" name="enabled" switch>
                Enabled
              </b-form-checkbox>
            </b-input-group>
            <b-input-group>
              <b-form-checkbox v-model="deprecated" name="deprecated" switch>
                Deprecated
              </b-form-checkbox>
            </b-input-group>
            <label>Workflow Definition</label>
            <div>
              <v-json-editor
                deck
                v-model="workflow_definition"
                :show-btns="false"
                :expandedOnStart="false"
                @has-error="validJson = false"
                @input="updatePreview"
              >
              </v-json-editor>
              <div v-if="this.preview_definition">
                <label>Workflow Preview</label>
                <dynamic-form
                  :definition="preview_definition"
                  :key="definitionState"
                ></dynamic-form>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- Contributors -->
      <b-card no-body v-if="showContributorFields">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            href="#"
            v-b-toggle.contributors
            variant="link"
            size="md"
            class="text-left"
            >Contributors</b-button
          >
        </b-card-header>
        <b-collapse id="contributors" accordion="contributors" role="tabpanel">
          <b-card-body>
            <label for="item-art-assistants">Art Assistant(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="art_assistant"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-art-directors">Art Director(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="art_director"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-artists-cover">Artist(s) - Cover</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="artist_cover"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-artists-interior">Artist(s) - Interior</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="artist_interior"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-authors">Author(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="author"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-designers">Designer(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="designer"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-developers">Developer(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="developer"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-editor">Editor(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="editor"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-graphic-designers">Graphic Designer(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="graphic_designer"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-play-testers">Play Tester(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="play_tester"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-proofreaders">Proofreader(s)</label>
            <b-input-group>
              <v-select
              This branch is 7 commits ahead, 2 commits behind master.    class="item-form-input"
                v-model="proofreader"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-research-assistants">Research Assistant(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="research_assistant"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-text-managers">Text Manager(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="text_manager"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-text-processors">Text Processor(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="text_processor"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>

            <label for="item-type-setters">Type Setter(s)</label>
            <b-input-group>
              <v-select
                class="item-form-input"
                v-model="type_setter"
                :options="contributors"
                :reduce="contributors => contributors.value"
                label="text"
                :multiple="true"
                :clearable="true"
                :searchable="true"
                :filterable="true"
                :close-on-select="true"
              >
              </v-select>
            </b-input-group>
          </b-card-body>
        </b-collapse>
      </b-card>
    </b-form-group>

    <!-- display for users -->
    <template v-if="!user.is_superuser">
      <h1 v-if="compiledMarkdown.length == 0">{{ this.name }}</h1>
      <hr v-if="compiledMarkdown.length == 0" />
      <div v-html="compiledMarkdown"></div>
      <h3>Details</h3>
      <hr />
      <div v-if="!!this.description" class="row">
        <div class="col-sm-2"><b>Description:</b></div>
        <div class="col-sm-6">{{ this.description }}</div>
      </div>
      <div v-if="!!this.short_name" class="row">
        <div class="col-sm-2"><b>Short Name:</b></div>
        <div class="col-sm-6">{{ this.short_name }}</div>
      </div>
      <div v-if="!!this.abbreviation" class="row">
        <div class="col-sm-2"><b>Abbreviation:</b></div>
        <div class="col-sm-6">{{ this.abbreviation }}</div>
      </div>
      <div v-if="!!this.publisher" class="row">
        <div class="col-sm-2"><b>Publisher:</b></div>
        <div class="col-sm-6">{{ this.publisher }}</div>
      </div>
      <div v-if="!!this.catalog_number" class="row">
        <div class="col-sm-2"><b>Catalog Number:</b></div>
        <div class="col-sm-6">{{ this.catalog_number }}</div>
      </div>
      <div v-if="!!this.publication_year" class="row">
        <div class="col-sm-2"><b>Publication Year:</b></div>
        <div class="col-sm-6">{{ this.publication_year }}</div>
      </div>
      <div v-if="this.pages > 0" class="row">
        <div class="col-sm-2"><b>Pages:</b></div>
        <div class="col-sm-6">{{ this.pages }}</div>
      </div>
      <div v-if="!!this.isbn_10" class="row">
        <div class="col-sm-2"><b>ISBN-10:</b></div>
        <div class="col-sm-6">
          <b-link
            v-if="isbn_10"
            :href="`https://isbnsearch.org/isbn/${isbn_10}`"
            target="_blank"
            title="ISBN-10 lookup"
          >
            <i class="fa fa-external-link"></i></b-link
          >{{ this.isbn_10 }}
        </div>
      </div>
      <div v-if="!!this.isbn_13" class="row">
        <div class="col-sm-2"><b>ISBN-13:</b></div>
        <div class="col-sm-6">
          <b-link
            v-if="isbn_13"
            :href="`https://isbnsearch.org/isbn/${isbn_13}`"
            target="_blank"
            title="ISBN-10 lookup"
          >
            <i class="fa fa-external-link"></i></b-link
          >{{ this.isbn_13 }}
        </div>
      </div>
      <div v-if="this.game.length > 0" class="row">
        <div class="col-sm-2"><b>Game(s):</b></div>
        <div class="col-sm-6">{{ this.game }}</div>
      </div>
      <div v-if="!!this.book_format" class="row">
        <div class="col-sm-2"><b>Book Format:</b></div>
        <div class="col-sm-6">{{ this.book_format }}</div>
      </div>
      <div v-if="this.author.length > 0" class="row">
        <div class="col-sm-2"><b>Author(s):</b></div>
        <div class="col-sm-6">{{ this.author }}</div>
      </div>
      <div v-if="this.art_assistant.length > 0" class="row">
        <div class="col-sm-2"><b>Art Assistant(s):</b></div>
        <div class="col-sm-6">{{ this.art_assistant }}</div>
      </div>
      <div v-if="this.art_director.length > 0" class="row">
        <div class="col-sm-2"><b>Art Director(s):</b></div>
        <div class="col-sm-6">{{ this.art_director }}</div>
      </div>
      <div v-if="this.artist_cover.length > 0" class="row">
        <div class="col-sm-2"><b>Cover Artist(s):</b></div>
        <div class="col-sm-6">{{ this.artist_cover }}</div>
      </div>
      <div v-if="this.artist_interior.length > 0" class="row">
        <div class="col-sm-2"><b>Interior Artist(s):</b></div>
        <div class="col-sm-6">{{ this.artist_interior }}</div>
      </div>
      <div v-if="this.designer.length > 0" class="row">
        <div class="col-sm-2"><b>Designer(s):</b></div>
        <div class="col-sm-6">{{ this.designer }}</div>
      </div>
      <div v-if="this.developer.length > 0" class="row">
        <div class="col-sm-2"><b>Developer(s):</b></div>
        <div class="col-sm-6">{{ this.developer }}</div>
      </div>
      <div v-if="this.editor.length > 0" class="row">
        <div class="col-sm-2"><b>Editor(s):</b></div>
        <div class="col-sm-6">{{ this.editor }}</div>
      </div>
      <div v-if="this.graphic_designer.length > 0" class="row">
        <div class="col-sm-2"><b>Graphic Designer(s):</b></div>
        <div class="col-sm-6">{{ this.graphic_designer }}</div>
      </div>
      <div v-if="this.play_tester.length > 0" class="row">
        <div class="col-sm-2"><b>Graphic Designer(s):</b></div>
        <div class="col-sm-6">{{ this.play_tester }}</div>
      </div>
      <div v-if="this.proofreader.length > 0" class="row">
        <div class="col-sm-2"><b>Proofreader(s):</b></div>
        <div class="col-sm-6">{{ this.proofreader }}</div>
      </div>
      <div v-if="this.research_assistant.length > 0" class="row">
        <div class="col-sm-2"><b>Research Assistant(s):</b></div>
        <div class="col-sm-6">{{ this.research_assistant }}</div>
      </div>
      <div v-if="this.text_manager.length > 0" class="row">
        <div class="col-sm-2"><b>Text Manager(s):</b></div>
        <div class="col-sm-6">{{ this.text_manager }}</div>
      </div>
      <div v-if="this.text_processor.length > 0" class="row">
        <div class="col-sm-2"><b>Text Processor(s):</b></div>
        <div class="col-sm-6">{{ this.text_processor }}</div>
      </div>
      <div v-if="this.type_setter.length > 0" class="row">
        <div class="col-sm-2"><b>Type Setter(s):</b></div>
        <div class="col-sm-6">{{ this.type_setter }}</div>
      </div>
    </template>

    <div>
      <b-button-group v-if="user.is_superuser" size="sm">
        <b-button
          ref="cancelitem-button"
          variant="secondary"
          @click="cancelEdit"
          class="float-left"
          >Cancel
        </b-button>
        <b-button
          :disabled="!itemValid"
          type="submit"
          variant="primary"
          @click="saveItem()"
          >Save
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { store } from "../Datastore";
import router from "../router/index";
import _ from "lodash";
import $ from "jquery";
import naturalCompare from "natural-compare";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import vueJsonEditor from "vue-json-editor";

import DynamicForm from "./components/DynamicForm";

Vue.component("v-select", vSelect);
Vue.component("v-json-editor", vueJsonEditor);
Vue.component("dynamic-form", DynamicForm);

let marked = require("marked");

export default {
  computed: {
    bookFormats: function() {
      return store.state.bookformats
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    books: function() {
      return store.state.books;
    },
    compiledMarkdown: function() {
      return marked(!this.markdownInput ? "" : this.markdownInput);
    },
    contributors: function() {
      return store.state.contributors
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    formatTypes: function() {
      return [
        { text: "Digital", value: "Digital" },
        { text: "Physical", value: "Physical" }
      ];
    },
    gameOptions: function() {
      return store.state.games
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    gameSystems: function() {
      return store.state.gamesystems
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    pageStatus: function() {
      return this.isItemImported || this.isItemNew || this.isItemLoaded
        ? true
        : false;
    },
    publishers: function() {
      return store.state.publishers
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    showContributorFields: function() {
      let result = false;
      if (this.singularName == "Book") {
        result = true;
      }
      return result;
    },
    showAdditionalDetails: function() {
      let result = false;
      if (
        this.singularName == "Book" ||
        this.singularName == "BookFormat" ||
        this.singularName == "Game" ||
        this.singularName == "GameSystem" ||
        this.singularName == "Publisher" ||
        this.singularName == "Workflow"
      ) {
        result = true;
      }
      return result;
    },
    showGame: function() {
      let result = false;
      if (this.singularName == "Workflow") {
        result = true;
      }
      return result;
    },
    showGames: function() {
      let result = false;
      if (this.singularName == "Book" || this.singularName == "Schema") {
        result = true;
      }
      return result;
    },
    user: function() {
      return store.state.user;
    },
    workflowMethods: function() {
      return [
        { text: "Manual", value: "Manual" },
        { text: "Automatic", value: "Automatic" }
      ];
    },
    workflowTypes: function() {
      return [
        { text: "CHARACHTER", value: "CHARACHTER" },
        { text: "NPC", value: "NPC" },
        { text: "OTHER", value: "OTHER" }
      ];
    }
  },
  data() {
    return {
      abbreviation: "",
      art_assistant: [],
      art_director: [],
      artist_cover: [],
      artist_interior: [],
      author: [],
      book_format: null,
      itemValid: false,
      catalog_number: "",
      deprecated: false,
      description: "",
      designer: [],
      developer: [],
      editor: [],
      enabled: true,
      format_type: "",
      game: "",
      games: [],
      game_system: null,
      graphic_designer: [],
      isbn_10: "",
      isbn_13: "",
      isBook: false,
      markdownInput: "",
      multiple: true,
      name: "",
      name_first: "",
      name_last: "",
      name_middle: "",
      name_prefix: "",
      name_suffix: "",
      pages: 0,
      play_tester: [],
      proofreader: [],
      publication_year: null,
      publisher: null,
      read_me: "",
      research_assistant: [],
      definitionState: 0,
      selected: [],
      short_name: "",
      text_manager: [],
      text_processor: [],
      type_setter: [],
      url: "",
      validJson: true,
      workflow_definition: null,
      preview_definition: null,
      workflow_method: "Manual"
    };
  },
  methods: {
    cancelEdit() {
      this.$store.state[this.itemsState] = [];
      router.push(`/${this.itemsState}`);
    },
    loadItem: function(item) {
      let vm = this;

      vm.name = item.name;
      vm.description = item.description;
      vm.read_me = item.read_me;
      vm.url = item.url;

      if (this.itemsState == "bookformats") {
        vm.format_type = item.format_type;
      }

      if (this.itemsState == "games") {
        vm.game_system = item.game_system;
      }

      if (
        this.itemsState == "books" ||
        this.itemsState == "games" ||
        this.itemsState == "publishers" ||
        this.itemsState == "gamesystems"
      ) {
        vm.abbreviation = item.abbreviation;
      }

      if (
        this.itemsState == "books" ||
        this.itemsState == "games" ||
        this.itemsState == "gamesystems"
      ) {
        vm.publisher = item.publisher;
        vm.short_name = item.short_name;
      }

      if (this.itemsState == "books") {
        vm.art_assistant = item.art_assistant;
        vm.art_director = item.art_director;
        vm.artist_cover = item.artist_cover;
        vm.artist_interior = item.artist_interior;
        vm.author = item.author;
        vm.book_format = item.book_format;
        vm.catalog_number = item.catalog_number;
        vm.designer = item.designer;
        vm.developer = item.developer;
        vm.editor = item.editor;
        vm.game = item.game;
        vm.graphic_designer = item.graphic_designer;
        vm.isbn_10 = item.isbn_10;
        vm.isbn_13 = item.isbn_13;
        vm.pages = item.pages;
        vm.play_tester = item.play_tester;
        vm.proofreader = item.proofreader;
        vm.publication_year = item.publication_year;
        vm.research_assistant = item.research_assistant;
        vm.text_manager = item.text_manager;
        vm.text_processor = item.text_processor;
        vm.type_setter = item.type_setter;
      }

      if (this.itemsState == "persons") {
        vm.name_first = item.name_first;
        vm.name_middle = item.name_middle;
        vm.name_last = item.name_last;
        vm.name_prefix = item.name_prefix;
        vm.name_suffix = item.name_suffix;
      }

      if (this.itemsState == "workflows") {
        vm.deprecated = item.deprecated;
        vm.enabled = item.enabled;
        vm.game = item.game;
        vm.workflow_definition = eval("(" + item.definition + ")");
        vm.preview_definition = eval("(" + item.definition + ")");
        vm.workflow_method = item.workflow_method;
      }

      vm.item = item;
      vm.isItemLoaded = true;
      this.markdownInput = item.read_me;

      this.validateItem();
    },
    saveItem: function() {
      this.$store.state[this.itemsState] = [];
      let item = {};

      item["id"] = this.item_id;
      item["description"] = this.description;
      item["name"] = this.name;
      item["read_me"] = this.read_me;
      item["url"] = this.url;

      if (this.itemsState == "bookformats") {
        item["format_type"] = this.format_type;
      }

      if (
        this.itemsState == "actions" ||
        this.itemsState == "books" ||
        this.itemsState == "workflows"
      ) {
        item["game"] = this.game;
      }

      if (this.itemsState == "games") {
        item["game_system"] = this.game_system;
      }

      if (
        this.itemsState == "books" ||
        this.itemsState == "games" ||
        this.itemsState == "gamesystems" ||
        this.itemsState == "publishers"
      ) {
        item["abbreviation"] = this.abbreviation;
      }

      if (
        this.itemsState == "books" ||
        this.itemsState == "games" ||
        this.itemsState == "gamesystems"
      ) {
        item["publisher"] = this.publisher;
        item["short_name"] = this.short_name;
      }

      if (this.itemsState == "books") {
        item["art_assistant"] = this.art_assistant;
        item["art_director"] = this.art_director;
        item["art_director"] = this.art_director;
        item["artist_cover"] = this.artist_cover;
        item["artist_interior"] = this.artist_interior;
        item["author"] = this.author;
        item["book_format"] = this.book_format;
        item["catalog_number"] = this.catalog_number;
        item["designer"] = this.designer;
        item["developer"] = this.developer;
        item["editor"] = this.editor;
        item["graphic_designer"] = this.graphic_designer;
        item["isbn_10"] = this.isbn_10;
        item["isbn_13"] = this.isbn_13;
        item["pages"] = this.pages;
        item["play_tester"] = this.play_tester;
        item["publication_year"] = this.publication_year;
        item["proofreader"] = this.proofreader;
        item["research_assistant"] = this.research_assistant;
        item["text_manager"] = this.text_manager;
        item["text_processor"] = this.text_processor;
        item["type_setter"] = this.type_setter;
      }

      if (this.itemsState == "persons") {
        item["name_first"] = this.name_first;
        item["name_middle"] = this.name_middle;
        item["name_last"] = this.name_last;
        item["name_prefix"] = this.name_prefix;
        item["name_suffix"] = this.name_suffix;
      }

      if (this.itemsState == "workflows") {
        item["deprecated"] = this.deprecated;
        item["enabled"] = this.enabled;
        item["game"] = this.game;
        item["definition"] = JSON.stringify(this.workflow_definition);
        item["workflow_method"] = this.workflow_method;
      }

      this.$store.dispatch({
        type: "putItem",
        itemsPath: this.itemsState,
        item: item
      });
      router.push(`/${this.itemsState}`);
    },
    updateMarkdown: _.debounce(function(e) {
      this.markdownInput = e;
    }, 300),
    updatePreview() {
      this.preview_definition = JSON.parse(
        JSON.stringify(this.workflow_definition)
      );
      this.definitionState += 1;
    },
    validateItem() {
      this.isbn10Valid = true;
      this.isbn13Valid = true;
      if (this.singularName == "Book") {
        this.isbn10Valid = !$("#item-isbn-10")[0]
          ? false
          : $("#item-isbn-10")[0].checkValidity();
        this.isbn13Valid = !$("#item-isbn-13")[0]
          ? false
          : $("#item-isbn-13")[0].checkValidity();
      }
      this.itemValid = this.isbn10Valid && this.isbn13Valid;
    }
  },
  mounted: function() {
    if (this.isItemImported) {
      this.loadItem(store.state.importedItem);
    }
  },
  name: "Detail",
  props: [
    "item_id",
    "isItemNew",
    "isItemImported",
    "item",
    "itemsState",
    "pluralName",
    "singularName"
  ],
  watch: {
    item: function() {
      if (!this.isItemImported && !!this.item) {
        this.loadItem(this.item);
      }
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        if (el.value && el.value !== "") {
          el.select();
        }
        el.focus();
      }
    }
  }
};
</script>

<style>
.item-form-input {
  margin-right: 15px;
  margin-top: 15px;
  width: 100%;
}
.item-form-input {
  margin-right: 15px;
  margin-bottom: 15px;
  width: 100%;
}
.required {
  color: red;
  vertical-align: super;
  font-size: 5pt;
  margin-left: 2px;
}
#app {
  max-width: 100%;
  margin: 1em auto;
}
label {
  font-weight: bold;
}
.panel-default > .panel-heading {
  background-color: #000;
}
</style>
