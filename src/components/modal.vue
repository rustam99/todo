<template>
	<div class="modal">
		<div class="modal__content">
			<slot></slot>
		</div>
		<div class="modal__controls">
			<button
				@click="emitTrue"
				class="modal__button button button_delete">
				Да
			</button>
			<button
				@click="emitFalse"
				class="modal__button button">
				Нет
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'modal',
	created() {
		document.body.style = 'pointer-events: none;';
	},
	beforeDestroy() {
		document.body.style = '';
	},
	methods: {
		emitTrue() {
			this.$emit('click', true);
		},
		emitFalse() {
			this.$emit('click', false);
		},
	},
};
</script>

<style lang="scss">
.modal {
	position: absolute;
	bottom: 100%;
	right: 0;
	margin-bottom: 10px;
	width: 250px;
	padding: 10px;
	box-sizing: border-box;
	background-color: rgba($black, .8);
	pointer-events: auto;

	&__content {
		line-height: 20px;
		color: $white;
	}

	&__controls {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}

	&__button {
		& + & {
			margin-left: 15px;
		}
	}
}
</style>
