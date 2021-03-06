
execute "clean it" do
    command "apt-get clean -y"
end

execute "update package index" do
    command "apt-get update"
end

group "deploy" do
    gid 123
end

if node[:user] == "vagrant"
    user "vagrant" do
        group "deploy"
    end

    template "/home/vagrant/.bashrc" do
        source "bashrc.erb"
        owner "vagrant"
    end
else
    node[:users].each do |u|
        user u[:name] do
            username u[:name]
            shell "/bin/bash"
            home "/home/#{u[:name]}"
            group "deploy"
        end

        directory "/home/#{u[:name]}" do
            owner u[:name]
            group "deploy"
            mode 0700
        end

        directory "/home/#{u[:name]}/.ssh" do
            owner u[:name]
            group "deploy"
            mode 0700
        end

        template "/home/#{u[:name]}/.bashrc" do
            source "bashrc.erb"
            owner u[:name]
            mode 0700
        end

        cookbook_file "/home/#{u[:name]}/.profile" do
            source "profile"
            owner u[:name]
            mode 0700
        end

        package "munin"


        cookbook_file "/var/cache/munin/www/.htpasswd" do
            source "htpasswd"
            owner "www-data"
            group "www-data"
            mode 0700
        end


        execute "authorized keys" do
            command "echo #{u[:key]} > /home/#{u[:name]}/.ssh/authorized_keys"
        end
    end

    cookbook_file "/etc/sudoers" do
        source "sudoers"
        mode 0440
    end
    
    package "dos2unix"
    execute "authorized keys" do
        command "dos2unix /etc/sudoers"
    end
end

directory "/usr/local/apps" do
    owner "www-data"
    group "deploy"
    mode 0770
end

directory "/usr/local/apps/#{node[:project]}" do
    owner "www-data"
    group "deploy"
    mode 0770
end

directory "/srv/downloads" do
    owner "www-data"
    group "deploy"
    mode 0770
end

directory "/usr/local/apps/#{node[:project]}/#{node[:app]}" do
    owner "www-data"
    group "deploy"
    mode 0770
end


directory "/usr/local/venv" do
    owner "www-data"
    group "deploy"
    mode 0770
end


# ssh  ------------------------------------------------------------------------

cookbook_file "/etc/ssh/sshd_config" do
    source "sshd_config"
end

execute "restart ssh" do
    command "service ssh restart"
end

package "vim"
package "python-software-properties"
package "ntp"
package "curl"
package "htop"
package "mosh"
package "mercurial"
package "subversion"
package "csstidy"
package "unzip"
package "python-pip"
package "python-dev"
package "mailutils"



include_recipe "openssl"
include_recipe "build-essential"
include_recipe "git"
include_recipe "python"
include_recipe "apt"
include_recipe "nginx"
include_recipe "postgresql::server"

# marine planner specific
package "postgresql-#{node[:postgresql][:version]}-postgis"

execute "add mapnik ppa" do
    command "/usr/bin/add-apt-repository -y ppa:mapnik/nightly-2.0 && /usr/bin/apt-get update"
    not_if "test -x /etc/apt/sources.list.d/mapnik-nightly-2_0-*.list"
end


# ## elastic search
# execute "add oracle java repo" do
#     command '/usr/bin/add-apt-repository -y ppa:webupd8team/java && /usr/bin/apt-get update'
#     not_if "test -x /etc/apt/sources.list.d/webupd8team-java-precise.list"
# end
# execute "accept-license" do
#   command "echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections"
# end

# package "oracle-java7-installer"
# package "oracle-java7-set-default"

# remote_file "/tmp/elasticsearch-0.90.7.deb" do
#   source "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.7.deb"
#   mode 0644
#   checksum "a3ec3c05ffabf8048642aa431b675f3c132b4fae755e1b7aee0cb9fe3f2a37ba" # PUT THE SHA256 CHECKSUM HERE
# end

# dpkg_package "elastic search" do
#   source "/tmp/elasticsearch-0.90.7.deb"
#   action :install
# end


package "libmapnik"
package "mapnik-utils"
package "python-mapnik"
package "python-kombu"
package "python-gdal"
package "python-imaging"
package "python-numpy"
package "python-psycopg2"
package "redis-server"

cookbook_file "/usr/share/proj/epsg" do
    source "epsg"
    mode 0755
end


template "/etc/init/app.conf" do
    source "app.conf.erb"
end


cookbook_file "/etc/postgresql/#{node[:postgresql][:version]}/main/pg_hba.conf" do
    source "pg_hba.conf"
    owner "postgres"
end
# if node[:user] == "vagrant"
#     template "/vagrant/mp/settings_local.py" do
#         source "settings_local.erb"
#         owner "vagrant"
#     end
# else
#     template "/usr/local/apps/marine-planner/mp/settings_local.py" do
#         source "settings_deploy.erb"
#         owner "www-data"
#     end
# end

template "/etc/init/app.conf" do
    source "app.conf.erb"
end

cookbook_file "/etc/postgresql/9.1/main/pg_hba.conf" do
    source "pg_hba.conf"
    owner "postgres"
end

execute "restart postgres" do
    command "sudo /etc/init.d/postgresql restart"
end


if node[:user] == "www-data"
    execute "restart nginx" do
        command "sudo /etc/init.d/nginx restart"
    end
end


# psql -d template_postgis -f /usr/share/postgresql/9.1/contrib/postgis-1.5/postgis.sql
# psql -d template_postgis -f /usr/share/postgresql/9.1/contrib/postgis-1.5/spatial_ref_sys.sql

if node[:user] == "vagrant"
    execute "create database user" do
        command "createuser -U postgres -s vagrant"
        not_if "psql -U postgres -c '\\du' |grep vagrant", :user => 'postgres'
    end
end

execute "create template database" do
    command "createdb -U postgres -T template0 -O postgres template_postgis -E UTF8 --locale=en_US.UTF-8"
    not_if "psql -U postgres --list | grep template_postgis", :user => 'postgres'
end

execute "load postgis" do
    command "psql  -U postgres -d template_postgis -f /usr/share/postgresql/9.1/contrib/postgis-1.5/postgis.sql"
    not_if "psql -U postgres template_postgis -P pager -t --command='SELECT tablename FROM pg_catalog.pg_tables'|grep spatial_ref_sys"
end
execute "load spatial references" do
    command "psql -U postgres  -d template_postgis -f /usr/share/postgresql/9.1/contrib/postgis-1.5/spatial_ref_sys.sql"
    not_if "psql -U postgres template_postgis -P pager -t --command='SELECT srid FROM  spatial_ref_sys' |grep 900913"
end

execute "create database" do
    command "createdb -U postgres -T template_postgis -O postgres #{node[:dbname]}"
    not_if "psql -U postgres --list | grep #{node[:dbname]}", :user => 'postgres'
end


python_virtualenv "/usr/local/venv/#{node[:project]}" do
    action :create
    group "deploy"
    options "--system-site-packages"
    if node[:user] == "vagrant"
        owner "vagrant"
    else
        owner "www-data"
    end
end
link "/usr/venv" do
  to "/usr/local/venv"
end

script 'create swapfile' do
  interpreter 'bash'
  not_if { File.exists?('/var/swapfile') }
  code <<-eof
    dd if=/dev/zero of=/var/swapfile bs=1M count=2048 &&
    chmod 600 /var/swapfile &&
    mkswap /var/swapfile
  eof
end

mount '/dev/null' do  # swap file entry for fstab
  action :enable  # cannot mount; only add to fstab
  device '/var/swapfile'
  fstype 'swap'
end

script 'activate swap' do
  interpreter 'bash'
  code 'swapon -a'
end