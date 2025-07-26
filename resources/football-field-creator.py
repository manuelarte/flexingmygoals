import re


class FootballFieldVars:
    field_length: int
    field_width: int
    field_grass_cut_width: int
    extra_space: int
    def __init__(self):
        self.field_length = 120
        self.field_width = 90
        self.field_grass_cut_width = 10
        self.extra_space = 3

def main():
    with open("football-field.svg.template") as f:
        print("Template file read")
        template: str = f.read()
        template_vars: FootballFieldVars = FootballFieldVars()
        for field in template_vars.__dict__:
            to_replace: str = f"{{{{ ${field} }}}}"
            to = getattr(template_vars, field)
            print(f"Replacing {to_replace}: {to}")
            template = template.replace(to_replace, str(to))

        eval_re = re.compile(r"{{ eval\((.*?)\) }}")
        for s in re.findall(eval_re, template):
            evaled = eval(s)
            print(f"Evaluating {s} = {evaled}")
            template = template.replace(f"{{{{ eval({s}) }}}}", str(evaled))
        with open(f"football-field-parsed-{template_vars.field_length}_{template_vars.field_width}.svg", "w") as text_file:
            text_file.write(template)
            print("SVG file created")

if __name__ == "__main__":
    main()
