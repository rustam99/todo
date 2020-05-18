<template>
	<div class="input">
		<template v-if="type === 'checkbox'">
			<label class="input__label input__label_flex">
				<input
					@click="toggleCheckbox"
					:checked="checkbox"
					class="input__hidden"
					type="checkbox">
				<div :class="classNames" class="input__checkbox"></div>
				<span v-if="label" class="input__text">{{label}}</span>
			</label>
		</template>
		<template v-else-if="type === 'radio'">
			<label class="input__label input__label_flex">
				<input
					@change="toggleRadio"
					:checked="radio"
					class="input__hidden"
					name="radio"
					type="radio">
				<div :class="classNames" class="input__checkbox"></div>
				<span v-if="label" class="input__text">{{label}}</span>
			</label>
		</template>
		<template v-else-if="type === 'textarea'">
			<span v-if="label" class="input__text">{{label}}</span>
			<textarea
				@input="changeValue"
				:placeholder="placeholder"
				class="input__textarea"
				:class="classNames"
				rows="10"></textarea>
		</template>
		<template v-else>
			<label class="input__label">
				<span v-if="label" class="input__text">{{label}}</span>
				<input
					@input="changeValue"
					:type="types"
					:placeholder="placeholder"
					:class="classNames"
					class="input__enter">
			</label>
		</template>
	</div>
</template>

<script>
export default {
	name: 'vInput',
	props: {
		type: String,
		label: String,
		placeholder: String,
		checked: Boolean,
		classNames: String,
		value: String,
		modelValue: String,
	},
	data() {
		return {
			checkbox: this.checked,
		};
	},
	methods: {
		toggleCheckbox() {
			this.checkbox = !this.checkbox;

			this.$emit('change', this.checkbox);
		},
		toggleRadio() {
			this.$emit('change', this.value);
		},
		changeValue(e) {
			const value = e.target.value;

			this.$emit('input', value);
		},
	},
	computed: {
		types() {
			return this.type ? this.type : 'text';
		},
		radio() {
			return this.value === this.modelValue;
		},
	},
};
</script>

<style lang="scss">
	.input {
		&__label {
			cursor: pointer;

			&_flex {
				display: inline-flex;
				align-items: center;

				.input__text {
					margin-left: 10px;
					margin-bottom: 0;
				}
			}
		}

		&__text {
			display: inline-block;
			margin-bottom: 5px;
		}

		&__hidden {
			display: none;

			&:checked + .input__checkbox:after {
				display: block;
			}
		}

		&__checkbox {
			position: relative;
			width: 16px;
			height: 16px;
			border: 1px solid $black;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -75%) rotate(-45deg);
				width: 50%;
				height: 25%;
				border: 1px solid transparent;
				border-bottom-color: $black;
				border-left-color: $black;
				display: none;
			}
		}

		&__enter {
			width: 100%;
			box-sizing: border-box;
			padding: 5px 10px;
			border: 1px solid $black;
			background-color: transparent;
			outline: none;

			&::placeholder {
				color: $black;
			}
		}

		&__textarea {
			width: 100%;
			padding: 10px;
			border: 1px solid $black;
			box-sizing: border-box;
			background-color: transparent;
			outline: none;
			resize: none;

			&::placeholder {
				color: $black;
			}
		}
	}
</style>
