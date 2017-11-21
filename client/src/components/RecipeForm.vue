<template>
  <form @submit.prevent="onSubmit">

    <div class="notification is-danger" v-if="!!errorMsg">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      {{ errorMsg }}
    </div>

    <div class="notification is-success" v-if="success">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
      Recipe updated successfully
    </div>

    <div style="margin-bottom: 1rem;" class="has-text-right" v-if="!recipe">
      <button class="button is-primary" :class="submitting ? 'is-loading' : ''" type="submit">
        <i class="fa fa-check btn-icon"></i> Create
      </button>
    </div>

    <div style="margin-bottom: 1rem;" v-else>
      <button class="button is-primary is-pulled-right" :class="submitting ? 'is-loading' : ''" type="submit">
        <i class="fa fa-check btn-icon"></i> Save
      </button>
      <button class="button is-danger" :disabled="submitting" type="button" @click="showModal(true)">
        <i class="fa fa-times btn-icon"></i> Delete
      </button>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <label class="label">Title <span class="required-field-marker">*</span></label>
              <div class="control">
                <input class="input" :class="!state.title ? 'is-danger' : ''" v-model="form.title" type="text" placeholder="Title">
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea class="textarea" v-model="form.description" type="text" placeholder="Description" rows="3"></textarea>
              </div>
            </div>
            <!--
            <div class="field">
              <div style="display: inline-block;">
                <input class="is-checkbox" id="private-checkbox" type="checkbox" name="private-checkbox" checked="checked" v-model="form.private" />
                <label for="private-checkbox" style="margin-right: 0.25rem; padding-right: 0;">Private?</label>
              </div>
            </div>
            -->
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <label class="label">Steps <span class="required-field-marker">*</span></label>
            <div class="field is-grouped is-grouped-centered" v-for="(step, i) in form.steps">
              <div class="control">
                <a class="button is-static">
                  {{ i + 1 }}
                </a>
              </div>
              <div class="control is-expanded">
                <!-- <dynamic-textarea v-model="form.steps[i]" rows="1" max-rows="5" class="textarea" :class="!state.steps[i] ? 'is-danger' : ''" placeholder="Step"></dynamic-textarea> -->
                <input v-model="form.steps[i]" type="input" class="input" :class="!state.steps[i] ? 'is-danger' : ''" placeholder="Step" />
              </div>
              <div class="control">
                <button class="button is-danger" :class="form.steps.length > 1 && !isMobile ? 'tooltip' : ''" type="button" @click="remove(i, elementType.STEP)" :disabled="form.steps.length < 2" data-tooltip="Remove Step">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-info" type="button" @click="add(elementType.STEP)">
                  <i class="fa fa-plus btn-icon"></i> Add Step
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <label class="label">Ingredients <span class="required-field-marker">*</span></label>
            <div v-for="(item, i) in form.ingredients">

              <div v-if="isMobile" style="margin-bottom: 0.75rem;">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-static">
                      {{ i + 1 }}
                    </a>
                  </div>
                  <div class="control is-expanded">
                    <input class="input" :class="!state.ingredients[i].amount ? 'is-danger' : ''" v-model="form.ingredients[i].amount" type="text" placeholder="#" />
                  </div>
                  <div class="control" style="width: 110px;">
                    <input class="input" :class="!state.ingredients[i].measurement ? 'is-danger' : ''" type="text" list="ingreds" placeholder="Measure" v-model="form.ingredients[i].measurement" />
                    <datalist id="ingreds">
                      <option v-for="item in form.ingredientOptions" :title="item.title">{{ item.value }}</option>
                    </datalist>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <div class="control is-expanded">
                    <input class="input" :class="!state.ingredients[i].name ? 'is-danger' : ''" v-model="form.ingredients[i].name" type="text" placeholder="Ingredient" />
                  </div>
                  <div class="control">
                    <button class="button is-danger" :class="form.ingredients.length > 1 && !isMobile ? 'tooltip' : ''" type="button" @click="remove(i, elementType.INGREDIENT)" :disabled="form.ingredients.length < 2" data-tooltip="Remove Ingredient">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <hr />
              </div>

              <div v-else style="margin-bottom: 0.75rem;">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-static">
                      {{ i + 1 }}
                    </a>
                  </div>
                  <div class="control" style="width: 110px;">
                    <input class="input" :class="!state.ingredients[i].amount ? 'is-danger' : ''" v-model="form.ingredients[i].amount" type="text" placeholder="Amount" />
                  </div>
                  <div class="control" style="width: 110px;">
                    <input class="input" :class="!state.ingredients[i].measurement ? 'is-danger' : ''" type="text" list="ingreds" placeholder="Measure" v-model="form.ingredients[i].measurement" />
                    <datalist id="ingreds">
                      <option v-for="item in form.ingredientOptions" :value="item.value" :title="item.title">{{ item.value }}</option>
                    </datalist>
                  </div>
                  <div class="control is-expanded">
                    <input class="input" :class="!state.ingredients[i].name ? 'is-danger' : ''" v-model="form.ingredients[i].name" type="text" placeholder="Ingredient" />
                  </div>
                  <div class="control">
                    <button class="button is-danger" :class="form.ingredients.length > 1 ? 'tooltip' : ''" type="button" @click="remove(i, elementType.INGREDIENT)" :disabled="form.ingredients.length < 2" data-tooltip="Remove Ingredient">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-info" type="button" @click="add(elementType.INGREDIENT)">
                  <i class="fa fa-plus btn-icon"></i> Add Ingredient
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <label class="label">Additional Notes</label>
              <div class="control">
                <textarea class="textarea" v-model="form.notes" type="text" placeholder="Additional Notes" rows="5"></textarea>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="require-field-notice">
      <span class="required-field-marker">*</span> Required Field
    </div>

    <div class="modal" :class="showDeleteModal ? 'is-active' : ''" v-if="!!recipe">
      <div class="modal-background" @click="showModal(false)"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete Recipe?</p>
          <!-- <button class="delete" aria-label="close" @click="showModal(false)" type="button"></button> -->
        </header>
        <section class="modal-card-body">
          Are you sure you want to delete this recipe?<br />
          <strong>This cannot be undone!</strong>
        </section>
        <footer class="modal-card-foot flex-right">
          <button class="button is-danger" @click="onDelete" type="button">Yes</button>
          <button class="button is-info" @click="showModal(false)" type="button">No</button>
        </footer>
      </div>
    </div>

  </form>
</template>

<script>
  import api from '@/utils/api';
  import utils from '@/utils/utils';
  import moment from 'moment';

  export default {
    name: 'recipe-form',
    props: ['recipe'],
    mounted: function() {
      utils.getCurrentUserInfo((success, response) => {
        this.user = response;
      });

      if (!!this.recipe) {
        this.form.title = this.recipe.title;
        this.form.description = this.recipe.description;
        this.form.private = this.recipe.private;
        this.form.notes = this.recipe.notes;

        let stepsStates = [];
        for (let i in this.recipe.steps)
          stepsStates.push(true);
        this.form.steps = this.recipe.steps;
        this.state.steps = stepsStates;

        let ings = [];
        let ingsStates = [];
        for (let i in this.recipe.ingredients) {
          if (this.recipe.ingredients.hasOwnProperty(i)) {
            let ing = this.recipe.ingredients[i];
            ings.push({ name: ing.name, measurement: ing.measurement, amount: ing.amount });
            ingsStates.push({ name: true, measurement: true, amount: true });
          }
        }
        this.form.ingredients = ings;
        this.state.ingredients = ingsStates;
      }
    },
    data: function() {
      return {
        elementType: Object.freeze({ STEP: 'steps', INGREDIENT: 'ingredients' }), // js enum
        isMobile: utils.isMobile(),
        showDeleteModal: false,
        user: null,
        submitting: false,
        errorMsg: null,
        success: false,
        form: {
          title: '',
          description: '',
          steps: [''],
          ingredients: [{ name: '', measurement: '', amount: '' }],
          ingredientOptions: [
            { value: 'c', title: 'Cup' },
            { value: 'g', title: 'Gram' },
            { value: 'kg', title: 'Kilogram' },
            { value: 'l', title: 'Liter' },
            { value: 'lb', title: 'Pound' },
            { value: 'ml', title: 'Milliliter' },
            { value: 'oz', title: 'Ounce' },
            { value: 'pt', title: 'Pint' },
            { value: 'tbsp', title: 'Tablespoon' },
            { value: 'tsp', title: 'Teaspoon' }
          ],
          private: false,
          notes: ''
        },
        state: {
          title: true,
          steps: [true],
          ingredients: [{ name: true, measurement: true, amount: true }]
        }
      }
    },
    methods: {
      showModal(show) {
        this.showDeleteModal = show;
      },
      add(type) {
        if (type === this.elementType.STEP) {
          this.form.steps.push('');
          this.state.steps.push(true);
        }
        else {
          this.form.ingredients.push({ name: '', measurement: '', amount: '' });
          this.state.ingredients.push({ name: true, measurement: true, amount: true });
        }
      },
      remove(index, type) {
        if (this.form[type].length > 1) {
          this.form[type].splice(index, 1);
          this.state[type].splice(index, 1);
        }
      },
      resetErrors() {
        this.success = false;
        this.errorMsg = null;
        this.state.title = true;
        this.state.steps.fill(true);
        this.state.ingredients.fill({ name: true, measurement: true, amount: true });
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        const data = {
          title: this.form.title,
          description: this.form.description,
          steps: this.form.steps,
          ingredients: {},
          id: !!this.recipe ? this.recipe.id : this.user.id,
          private: this.form.private,
          notes: this.form.notes,
          date: moment().toISOString()
        }

        for (let i = 0; i < this.form.ingredients.length; i++) {
          const ing = this.form.ingredients[i];
          data.ingredients[i] = { name: ing.name, measurement: ing.measurement, amount: ing.amount };
        }

        const submissionMethod = !!this.recipe ? api.updateRecipe : api.addRecipe;
        submissionMethod(data, (success, response) => {
          if (success) {
            if (!!this.recipe) {
              this.success = true;
              this.submitting = false;
            }
            else
              window.location.href = '/recipes/' + response.content.id;
          }
          else {
            this.state.title = response.data.content.titleState;
            this.state.steps = response.data.content.stepsState;
            this.state.ingredients = response.data.content.ingredientsState;
            this.errorMsg = response.data.message;
            this.submitting = false;
          }
        });
      },
      onDelete(event) {
        api.deleteRecipe(this.recipe.id, (success, response) => {
          if (success) {
            window.location.href = '/recipes';
          }
          else {
            this.errorMsg = 'There was a problem when attempting to delete the recipe';
          }
        });
      }
    }
  }
</script>
