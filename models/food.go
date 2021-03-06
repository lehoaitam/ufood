package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type Food struct {
	Id          int64
	Name        string      `orm:"size(128)" form:"Name" valid:"Required"`
	Description string      `orm:"size(512)" form:"Description" valid:"Required"`
	Categories  *Categories `orm:"rel(fk)"`
	Price       float64     `orm:"" form:"Price" valid:"Required"`
	Image       string      `orm:"size(256)" form:"Image" valid:"Required"`
	ActiveFlg   bool        `orm:"default(true)"`
	DeleteFlg   bool        `orm:"default(false)"`
	Created     time.Time   `orm:"auto_now_add;type(datetime)"`
	Updated     time.Time   `orm:"auto_now;type(datetime)"`
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(Food))
}

func (m *Food) TableUnique() [][]string {
	return [][]string{
		[]string{"Name", "Categories"},
	}
}
func (m *Food) Insert() (int64, error) {
	return orm.NewOrm().Insert(m)
}

func (m *Food) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Food) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetFoods() orm.QuerySeter {
	var table Food
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}
