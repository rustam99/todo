<template>
	<div class="card-list" :class="isGroup">
		<ul class="card-list__list">
			<li
				v-for="el in filteredList"
				:key="el.id"
				class="card-list__item">
				<card
					:type="type"
					:groupId="groupId"
					:id="el.id"
					:title="el.title"
					:desc="el.desc"
					:status="el.status">
				</card>
			</li>
			<li
				v-if="isEmtyList"
				class="card-list__item card-list__item_empty">Здесь пока пусто</li>
		</ul>
	</div>
</template>

<script>
import card from '@/components/card';
import { mapState } from 'vuex';

export default {
	name: 'cardList',
	props: {
		list: Array,
		groupId: Number,
		type: {
			type: String,
			default: 'default',
		},
	},
	data() {
		return {
			cardList: this.list,
			search: '',
			status: {
				status: false,
				performed: false,
			},
		};
	},
	computed: {
		...mapState(['filterSearch', 'filterStatus']),
		isGroup() {
			return this.type === 'group' ? 'card-list_group' : '';
		},
		isEmtyList() {
			return !this.list.length;
		},
		filteredList() {
			const performed = this.status.status && this.status.performed;
			const notPerformed = this.status.status && !this.status.performed;

			// Не реалтзована функция одновременного нажатия на чекбоксы, не хватило веремени(
			return this.cardList.filter((item) => {
				if ((this.search === '' && performed)
					|| (this.search === '' && notPerformed)) {
					return performed === item.status;
				}

				return (item.title.toLowerCase().match(this.search)
					|| item.desc.toLowerCase().match(this.search))
					&& (performed === item.status
					|| notPerformed === !item.status);
			});
		},
	},
	watch: {
		filterSearch(value) {
			this.search = value.toLowerCase();
		},
		filterStatus(value) {
			this.status = value;
		},
	},
	components: {
		card,
	},
};
</script>

<style lang="scss">
	.card-list {

		&__list {
			list-style-type: none;
		}

		&__item {
			& + & {
				margin-top: 15px;
			}

			&_empty {
				font-size: 1.5rem;
				text-align: center;
			}
		}

		&_group {
			.card-list__list {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin: 0 -10x;
			}

			.card-list__item {
				flex-basis: 240px;
				margin: 0 10px 10px 10px;
			}
		}
	}

</style>
