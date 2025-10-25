<template>
  <v-expansion-panel>
    <template #title>
      <b class="mr-1">{{ number }}</b> {{ name }}
    </template>
    <template #text>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          class="text-indigo-accent-1"
          hide-details="auto"
          label="Player's name"
          placeholder="Name"
          prepend-inner-icon="mdi-account-outline"
          required
          :rules="nameRules"
        >
          <template #prepend>
            <v-number-input
              v-model="number"
              class="align-content-center"
              control-variant="split"
              hide-details
              :hide-input="true"
              :inset="true"
              :max="99"
              :min="1"
              :step="1"
            />
          </template>
        </v-text-field>
      </v-form>
    </template>
  </v-expansion-panel>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'
  import type { IBoardActorAction, IBoardPlayer } from '@/types/board.action.types.ts'
  import { BoardPlayer } from '@/models/board.action.model'

  const props = defineProps({
    playerAction: {
      type: Object as PropType<IBoardActorAction<IBoardPlayer>>,
      required: true,
    },
  })

  const valid = ref(false)
  const name = ref(props.playerAction.actor.name)
  const number = ref(props.playerAction.actor.number)

  watchEffect(() => {
    name.value = props.playerAction.actor.name
    number.value = props.playerAction.actor.number
  })

  const nameRules: Array<(value: string) => string | boolean> = [
    value => !!value || 'Required.',
    value => (value && value.length >= BoardPlayer.MIN_NAME_LENGTH) || `Min ${BoardPlayer.MIN_NAME_LENGTH} characters`,
    value => (value && value.length <= BoardPlayer.MAX_NAME_LENGTH) || `Max ${BoardPlayer.MAX_NAME_LENGTH} characters`,
  ]

</script>

<style scoped lang="sass">

</style>
