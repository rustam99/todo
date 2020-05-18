<template>
	<header class="header">
		<div class="container">
			<ul class="header__list">
				<li class="header__item">
					<router-link to="/" exact class="logo">Todo</router-link>
				</li>
				<li class="header__item header__item_flex">
					<v-input
						@change="setStatus($event, true)"
						classNames="header__checkbox"
						class="header__label"
						type="checkbox"
						label="Завершенные"/>
					<v-input
						@change="setStatus($event, false)"
						classNames="header__checkbox"
						class="header__label"
						type="checkbox"
						label="Не завершенные"/>
					<v-input
						@input="setValue"
						classNames="header__search"
						class="header__input"
						placeholder="Введите названия"/>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
import vInput from '@/components/input';

export default {
	name: 'vHeader',
	methods: {
		setStatus(status, performed) {
			this.$store.commit('setFilterStatus', {
				status,
				performed,
			});
		},
		setValue(value) {
			this.$store.commit('setfilterSearch', value);
		},
	},
	components: {
		vInput,
	},
};
</script>

<style lang="scss">
	.header {
		padding: 20px 0;
		background-color: $black;

		&__list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			list-style-type: none;
		}

		&__item {
			&_flex {
				display: flex;
				align-items: center;
			}
		}

		&__search {
			border-color: $white;
			color: $white;

			&::placeholder {
				color: $white;
			}
		}

		&__input {
			margin-left: 20px;
			width: 300px;
		}

		&__checkbox {
			border-color: $white;

			&:after {
				border-bottom-color: $white;
				border-left-color: $white;
			}
		}

		&__label {
			color: $white;

			& + & {
				margin-left: 20px;
			}
		}

		@include tablet {
			&__list {
				flex-direction: column;
			}

			&__item {
				& + & {
					margin-top: 20px;
				}

				&_flex {
					flex-direction: column;
				}
			}

			&__label {
				& + & {
					margin-top: 20px;
				}
			}

			&__input {
				margin-top: 20px;
			}
		}

		@include phone {
			&__input {
				width: 200px;
			}
		}
	}

	.logo {
		color: $white;
		font-size: rem(38px);
	}
</style>
